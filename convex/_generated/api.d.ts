/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accountSettings from "../accountSettings.js";
import type * as accounts from "../accounts.js";
import type * as billing from "../billing.js";
import type * as clients from "../clients.js";
import type * as customers from "../customers.js";
import type * as invoices from "../invoices.js";
import type * as leads from "../leads.js";
import type * as lib_plans from "../lib/plans.js";
import type * as lib_secret from "../lib/secret.js";
import type * as lib_text from "../lib/text.js";
import type * as signIns from "../signIns.js";
import type * as validators from "../validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accountSettings: typeof accountSettings;
  accounts: typeof accounts;
  billing: typeof billing;
  clients: typeof clients;
  customers: typeof customers;
  invoices: typeof invoices;
  leads: typeof leads;
  "lib/plans": typeof lib_plans;
  "lib/secret": typeof lib_secret;
  "lib/text": typeof lib_text;
  signIns: typeof signIns;
  validators: typeof validators;
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
