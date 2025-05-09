import {createClient} from "@supabase/supabase-js";
import { defineEventHandler, createError } from 'h3';

// This API put messages in the DB
export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Missing database configuration' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await readBody(event);

    const { data, error }= await supabase.from('messages').insert([
        {
            email: body.email,
            message: body.message,
        }
    ])

    if(error) {
        throw createError({statusCode: error.code, statusMessage: error.message})
    }

    return data;

  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});
