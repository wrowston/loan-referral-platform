/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_createBorrowerAccount from "../actions/createBorrowerAccount.js";
import type * as actions_importLenders from "../actions/importLenders.js";
import type * as actions_sendEmail from "../actions/sendEmail.js";
import type * as actionsHelpers from "../actionsHelpers.js";
import type * as borrowers from "../borrowers.js";
import type * as commissions from "../commissions.js";
import type * as deals from "../deals.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as internalNotes from "../internalNotes.js";
import type * as lenders from "../lenders.js";
import type * as lib_dealNumber from "../lib/dealNumber.js";
import type * as lib_emailTemplates from "../lib/emailTemplates.js";
import type * as lib_permissions from "../lib/permissions.js";
import type * as partners from "../partners.js";
import type * as resources from "../resources.js";
import type * as statusHistory from "../statusHistory.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/createBorrowerAccount": typeof actions_createBorrowerAccount;
  "actions/importLenders": typeof actions_importLenders;
  "actions/sendEmail": typeof actions_sendEmail;
  actionsHelpers: typeof actionsHelpers;
  borrowers: typeof borrowers;
  commissions: typeof commissions;
  deals: typeof deals;
  files: typeof files;
  http: typeof http;
  internalNotes: typeof internalNotes;
  lenders: typeof lenders;
  "lib/dealNumber": typeof lib_dealNumber;
  "lib/emailTemplates": typeof lib_emailTemplates;
  "lib/permissions": typeof lib_permissions;
  partners: typeof partners;
  resources: typeof resources;
  statusHistory: typeof statusHistory;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
