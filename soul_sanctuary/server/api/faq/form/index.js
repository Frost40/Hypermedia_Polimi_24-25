import { createClient } from '@supabase/supabase-js'

// Create Supabase client using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default defineEventHandler(async (event) => {
  try {
    // Get form data from the request
    const body = await readBody(event)

    // Validate fields
    const validationErrors = validateFormData(body)
    if (validationErrors.length > 0) {
      return {
        status: 'error',
        statusCode: 400,
        message: 'Validation failed',
        errors: validationErrors
      }
    }

    // Insert data into the Supabase table
    const { data, error } = await supabase
      .from('question')
      .insert([
        {
          name: body.name,
          email: body.email,
          course: body.course,
          question: body.question,
          created_at: new Date()
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return {
        status: 'error',
        statusCode: 500,
        message: 'Failed to submit question'
      }
    }

    return {
      status: 'success',
      statusCode: 200,
      message: 'Question submitted successfully'
    }

  } catch (error) {
    console.error('Server error:', error)
    return {
      status: 'error',
      statusCode: 500,
      message: 'Internal server error'
    }
  }
})

// Function to validate form data
function validateFormData(data) {
  const errors = []

  // Validate name
  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required')
  } else if (data.name.length > 100) {
    errors.push('Name cannot exceed 100 characters')
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required')
  } else if (!emailRegex.test(data.email)) {
    errors.push('Please provide a valid email address')
  }

  // Validate course
  if (!data.course || data.course.trim() === '') {
    errors.push('Course selection is required')
  }

  // Validate question
  if (!data.question || data.question.trim() === '') {
    errors.push('Question is required')
  } else if (data.question.length > 1000) {
    errors.push('Question cannot exceed 1000 characters')
  }

  return errors
}