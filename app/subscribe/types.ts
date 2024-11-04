// subscribe/types.ts

export interface SubscriptionAttributes {
  documentId: string; // ID for the document
  title: string; // Title of the subscription
  price: number; // Price of the subscription
  interval: string; // Billing interval (monthly, yearly, etc.)
  description: string; // Description of the subscription
  createdAt: string; // Creation date
  updatedAt: string; // Last updated date
  publishedAt: string; // Publication date
  features: string; // Features of the subscription
  slug: string; // Slug for the subscription
}

export interface Subscription {
  id: number; // Unique identifier for the subscription
  attributes: SubscriptionAttributes; // The attributes of the subscription
  documentId: string; // ID for the document
  title: string; // Title of the subscription
  price: number; // Price of the subscription
  interval: string; // Billing interval (monthly, yearly, etc.)
  description: string; // Description of the subscription
  createdAt: string; // Creation date
  updatedAt: string; // Last updated date
  publishedAt: string; // Publication date
  features: string; // Features of the subscription
  slug: string; // Slug for the subscription
}

export interface SubscriptionResponse {
  data: Subscription[]; // An array of Subscription objects
  meta: {
    pagination: {
      page: number; // Current page
      pageSize: number; // Number of items per page
      pageCount: number; // Total number of pages
      total: number; // Total number of subscriptions
    };
  };
}
