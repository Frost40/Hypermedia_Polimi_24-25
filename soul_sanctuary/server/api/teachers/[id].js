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

    const { data: teacherData, error: teacherError } = await supabase
      .from("teacher")
      .select(`
        *,
        teacherActivity(
          *,
          activity(*)
        )
      `)
      .eq("id", id)
      .single();

    if (teacherError) {
      throw createError({ statusCode: 400, statusMessage: teacherError.message });
    }

    const { teacherActivity, ...otherTeacherFields } = teacherData;
    const activities = teacherActivity?.map((entry) => entry.activity) || [];

    const { data: managedActivities, error: managerError } = await supabase
      .from("activity")
      .select("*")
      .eq("managerId", id);

    if (managerError) {
      throw createError({ statusCode: 400, statusMessage: managerError.message });
    }

    return {
      ...otherTeacherFields,
      activities,
      managedActivities
    };

  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});
