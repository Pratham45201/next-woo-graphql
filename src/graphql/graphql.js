import { gql } from "@apollo/client";

export const GetAllProducts = gql`
  query GetAllProducts(
    $first: Int = 1
    $after: String = ""
    $field: ProductsOrderByEnum = DATE
    $order: OrderEnum = ASC
    $search: String = ""
    $maxPrice: Float = 1000000
    $minPrice: Float = 0
  ) {
    products(
      first: $first
      after: $after
      where: {
        orderby: { field: $field, order: $order }
        maxPrice: $maxPrice
        minPrice: $minPrice
        search: $search
      }
    ) {
      nodes {
        id
        name
        averageRating
        type
        __typename
        image {
          altText
          sourceUrl
        }
        ... on SimpleProduct {
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          regularPrice(format: FORMATTED)
          databaseId
        }
        ... on SimpleProduct {
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          regularPrice(format: FORMATTED)
          databaseId
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GetSingleProduct = gql`
  query GetSingleProduct($id: ID = "") {
    product(id: $id, idType: DATABASE_ID) {
      id
      name
      averageRating
      description(format: RAW)
      shortDescription(format: RAW)
      reviews {
        nodes {
          commentedOn {
            node {
              date
            }
          }
        }
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      galleryImages {
        nodes {
          altText
          mediaItemUrl
        }
      }
      ... on SimpleProduct {
        price
        salePrice(format: FORMATTED)
        databaseId
      }
      ... on VariableProduct {
        price
        salePrice(format: FORMATTED)
        databaseId
      }
    }
  }
`;

export const RegisterUser = gql`
  mutation Signup(
    $firstName: String = ""
    $lastName: String = ""
    $email: String = ""
    $username: String = ""
    $password: String = ""
  ) {
    registerCustomer(
      input: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
        username: $username
      }
    ) {
      authToken
      refreshToken
    }
  }
`;

export const LoginUser = gql`
  mutation LoginUser($password: String = "", $username: String = "") {
    login(input: { password: $password, username: $username }) {
      authToken
    }
  }
`;

export const AddToCart = gql`
  mutation AddToCart($productId: Int = 73, $quantity: Int = 1) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cartItem {
        total
      }
    }
  }
`;

export const GetCart = gql`
  query GetCart {
    cart {
      total(format: FORMATTED)
      subtotalTax(format: FORMATTED)
      shippingTotal(format: FORMATTED)
      shippingTax(format: FORMATTED)
      subtotal(format: FORMATTED)
      totalTax(format: FORMATTED)
      totalTaxes {
        amount(format: FORMATTED)
        label
      }
      contents {
        nodes {
          quantity
          product {
            node {
              ... on SimpleProduct {
                regularPrice(format: FORMATTED)
                salePrice(format: FORMATTED)
              }
              name
              ... on VariableProduct {
                regularPrice(format: FORMATTED)
                salePrice(format: FORMATTED)
              }
            }
          }
        }
      }
    }
  }
`;

export const GetWishList = gql`
  query GetWishList {
    getWishList {
      products {
        name
        priceHtml
        databaseId
      }
    }
  }
`;