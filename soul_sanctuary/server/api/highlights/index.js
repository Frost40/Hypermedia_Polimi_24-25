import {createClient} from "@supabase/supabase-js";
import { defineEventHandler, createError } from 'h3';

// This API endpoint retrieves all highlights from the Supabase database
export default defineEventHandler(async (event) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw createError({ statusCode: 500, statusMessage: 'Missing database configuration' });
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: highlights, error } = await supabase
            .from('activity')
            .select('*')
            .eq('highlighted', true);

        if (error) {
            return  createError({statusCode: 400, statusMessage: error.message})
        }

        return highlights;

    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: e.message });
    }
});