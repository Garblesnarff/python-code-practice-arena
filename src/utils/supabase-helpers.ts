
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase
      .from(table)
      .select(field)
      .eq(filterField, filterValue)
      .single();
    
    if (error) throw error;
    
    // Calculate new value
    const currentValue = data[field] || 0;
    const newValue = currentValue + increment;
    
    // Update with new value
    const { error: updateError } = await supabase
      .from(table)
      .update({ [field]: newValue })
      .eq(filterField, filterValue);
    
    if (updateError) throw updateError;
    
    return { success: true, newValue };
  } catch (error) {
    console.error(`Error incrementing ${field} in ${table}:`, error);
    return { success: false, error };
  }
};
