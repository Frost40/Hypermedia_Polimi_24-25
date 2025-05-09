import {createClient} from "@supabase/supabase-js";
import { defineEventHandler, createError } from 'h3';

// This API endpoint retrieves all activities from the Supabase database
export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  const id = event.context.params.id;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Missing database configuration' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: teacherData, error } = await supabase
        .from('teacher')
        .select('*')
        .eq('id', id);

    if (error) {
      return  createError({statusCode: 400, statusMessage: error.message})
    }

    return teacherData;

  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});