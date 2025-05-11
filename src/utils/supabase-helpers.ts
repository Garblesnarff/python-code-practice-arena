
import { supabase } from '@/integrations/supabase/client';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

/**
 * Increments a numeric value in a Supabase table
 * A replacement for the RPC increment function that may not be available
 */
export const incrementField = async (
  table: string, 
  field: string, 
  increment: number, 
  filterField: string, 
  filterValue: string
) => {
  try {
    // First, get the current value
    // Use type assertion to handle generic table types
    const { data, error } = await (supabase
      .from(table as any)
      .select(field)
      .eq(filterField, filterValue)
      .single() as any);
    
    if (error) throw error;
    
    // Calculate new value
    const currentValue = data[field] || 0;
    const newValue = currentValue + increment;
    
    // Update with new value
    const { error: updateError } = await (supabase
      .from(table as any)
      .update({ [field]: newValue })
      .eq(filterField, filterValue) as any);
    
    if (updateError) throw updateError;
    
    return { success: true, newValue };
  } catch (error) {
    console.error(`Error incrementing ${field} in ${table}:`, error);
    return { success: false, error };
  }
};
