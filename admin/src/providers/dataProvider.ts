import { DataProvider } from "@refinedev/core";
import { supabaseClient } from "./supabaseClient";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const current = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;

    const query = supabaseClient.from(resource).select("*", { count: "exact" });

    // Apply filters
    if (filters) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          query.eq(filter.field, filter.value);
        }
        if ("field" in filter && filter.operator === "contains") {
          query.ilike(filter.field, `%${filter.value}%`);
        }
      });
    }

    // Apply sorters
    if (sorters && sorters.length > 0) {
      const sorter = sorters[0];
      if ("field" in sorter) {
        query.order(sorter.field, {
          ascending: sorter.order === "asc",
        });
      }
    }

    // Apply pagination
    const from = (current - 1) * pageSize;
    const to = from + pageSize - 1;
    query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  },

  getOne: async ({ resource, id }) => {
    const { data, error } = await supabaseClient
      .from(resource)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const { data, error } = await supabaseClient
      .from(resource)
      .insert(variables)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const { data, error } = await supabaseClient
      .from(resource)
      .update(variables)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const { data, error } = await supabaseClient
      .from(resource)
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  getApiUrl: () => {
    return import.meta.env.VITE_SUPABASE_URL;
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    // Custom implementation for special cases
    return { data: [] };
  },
};
