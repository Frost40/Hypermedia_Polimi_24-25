import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const id = event.context.params.id;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: "Missing database configuration" });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get activity and teachers data
    const { data: activityData, error: activityError } = await supabase
      .from("activity")
      .select(`
        *,
        teacherActivity(
          *,
          teacher(
            id,
            fullname,
            photo,
            area
          )
        )
      `)
      .eq("id", id)
      .single();

    if (activityError) {
      throw createError({ statusCode: 400, statusMessage: activityError.message });
    }

    const { teacherActivity, managerId, ...otherActivityFields } = activityData;
    const teachers = teacherActivity?.map((entry) => entry.teacher) || [];

    // Get manager data
    let manager = null;
    if (managerId) {
      const { data: managerData, error: managerError } = await supabase
        .from("teacher")
        .select("id, fullname, photo, area")
        .eq("id", managerId)
        .single();

      if (managerError) {
        throw createError({ statusCode: 400, statusMessage: managerError.message });
      }

      manager = managerData;
    }

    // Answer
    return {
      id,
      teachers,
      manager
    };

  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

