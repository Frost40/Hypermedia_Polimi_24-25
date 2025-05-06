import {createClient} from "@supabase/supabase-js";
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  console.log('*** Entrato nella route API /api/activities ***'); // <-- Aggiungi questo

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  console.log('SUPABASE_URL impostato:', !!supabaseUrl); // <-- Aggiungi questo
  console.log('SUPABASE_KEY impostata:', !!supabaseKey); // <-- Aggiungi questo


  if (!supabaseUrl || !supabaseKey) {
    console.error('*** Variabili d\'ambiente Supabase mancanti! ***'); // <-- Aggiungi questo
    // Puoi anche lanciare un errore qui per un feedback più chiaro al frontend
    // throw createError({ statusCode: 500, statusMessage: 'Configurazione Supabase mancante.' });
    // Per ora, andiamo avanti per vedere se il client viene creato comunque (sebbene probabilmente fallirà dopo)
  }

  try { // <-- Aggiungi un blocco try...catch
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Client Supabase creato.'); // <-- Aggiungi questo

    const { data: allActivities, error } = await supabase
        .from('activity')
        .select('*');

    if (error) {
      console.error('*** Errore nel fetching delle attività da Supabase: ***', error); // <-- Aggiungi questo
      throw createError({statusCode: 400, statusMessage: error.message})
    }

    console.log('*** Attività fetched con successo: ***', allActivities ? allActivities.length : 0); // <-- Aggiungi questo
    return allActivities;

  } catch (e) { // <-- Cattura eventuali errori durante la creazione del client o il fetch
    console.error('*** Errore generico nella route API: ***', e); // <-- Aggiungi questo
    throw createError({ statusCode: 500, statusMessage: 'Errore interno del server.' });
  }
});