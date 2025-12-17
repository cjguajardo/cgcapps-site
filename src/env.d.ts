/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        images: Record<string, any>;
        badges: Record<string, any>;
        portfolio: Record<string, any>;
    }
}