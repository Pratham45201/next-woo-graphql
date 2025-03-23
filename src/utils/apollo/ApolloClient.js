/*eslint complexity: ["error", 6]*/
"use client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  ApolloProvider,
  from,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

// 7 days in milliseconds
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

// Type policy for pagination and caching
const typePolicies = {
  RootQuery: {
    queryType: true,
    fields: {
      products: relayStylePagination(["where"]),
    },
  },
};

const isBrowser = typeof window !== "undefined";

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
function getSession() {
  if (!isBrowser) return null;
  const sessionData = isBrowser
    ? JSON.parse(localStorage.getItem("woo-session"))
    : null;
  return sessionData;
}
export const middleware = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   * Here we also delete the session if it is older than 7 days
   */

  const sessionData = getSession();

  if (sessionData && sessionData.token && sessionData.createdTime) {
    const { token, createdTime } = sessionData;

    // Check if the token is older than 7 days
    if (Date.now() - createdTime > SEVEN_DAYS) {
      // If it is, delete it
      if (isBrowser) {
        localStorage.removeItem("woo-session");
        localStorage.setItem("woocommerce-cart", JSON.stringify({}));
      }
    } else {
      // If it's not, use the token
      operation.setContext(() => ({
        headers: {
          "woocommerce-session": `Session ${token}`,
        },
      }));
    }
  }

  return forward(operation);
});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const session = headers.get("woocommerce-session");

    if (session && isBrowser) {
      if ("false" === session) {
        // Remove session data if session destroyed.
        localStorage.removeItem("woo-session");
        // Update session new data if changed.
      } else if (!localStorage.getItem("woo-session")) {
        localStorage.setItem(
          "woo-session",
          JSON.stringify({ token: session, createdTime: Date.now() })
        );
      }
    }

    return response;
  })
);

const isServerSide = typeof window === "undefined";

// Apollo GraphQL client.
const client = new ApolloClient({
  ssrMode: isServerSide,
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        fetch,
      })
    )
  ),
  cache: new InMemoryCache({ typePolicies }),
});

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
