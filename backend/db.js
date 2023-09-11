const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE_DB_NAME, 
  });
  
  db.connect()
  .then(async () => {
      console.log('Connected to PostgreSQL');
      
      await createUsersTable();
      await createRefreshTokenTable();
      await createGlobalExerciseTable();
  })
  .catch((err) => {
      console.error('Error connecting to PostgreSQL', err);
  });

    const createUsersTable = async () => {
        try {
            const query = `
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    email_verified BOOLEAN DEFAULT FALSE,
                    role VARCHAR(255) NOT NULL DEFAULT 'user'
                );
            `;
    
            await db.query(query);
            
        } catch (error) {
            console.error('Ein Fehler beim erstellen der Tabelle "user" ist aufgetreten:', error);
        }
    };

    const createRefreshTokenTable = async () => {
      try {
          const query = `
              
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL
  );
          `;
  
          await db.query(query);
         
      } catch (error) {
          console.error('Ein Fehler beim erstellen der Tabelle "refresh token" ist aufgetreten:', error);
      }
  };

const createGlobalExerciseTable = async () => {
    try {
        const query = `       
            CREATE TABLE IF NOT EXISTS global_exercises (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "global exercise" ist aufgetreten:', error);
    }
};

const createUserExerciseTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS user_exercises (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            description TEXT
        );
        `;

        await db.query(query);
    } catch (error) {
        if (error.code === '23505') { // 23505 ist der Fehlercode für Unique Constraint Verstoß in PostgreSQL
            console.error('Ein Eintrag mit diesem Übungs-Namen existiert bereits.');
        } else {
            console.error('Ein Fehler beim erstellen der Tabelle "global exercise" ist aufgetreten:', error);
        }
    }
};

const createWorkoutsTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS workouts (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP,
            duration INT,
            notes TEXT
        );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "workouts" ist aufgetreten:', error);
    }
};

const createWorkoutExerciseTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS workout_exercises (
            id SERIAL PRIMARY KEY,
            workout_id INT REFERENCES workouts(id) ON DELETE CASCADE,
            global_exercise_id INT REFERENCES global_exercises(id) ON DELETE CASCADE,
            user_exercise_id INT REFERENCES user_exercises(id) ON DELETE CASCADE
        );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "workout exercise" ist aufgetreten:', error);
    }
};

const createWorkoutSetsTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS workout_sets (
            id SERIAL PRIMARY KEY,
            workout_exercise_id INT REFERENCES workout_exercises(id) ON DELETE CASCADE,
            reps INT NOT NULL,
            weight DECIMAL,
            set_number INT NOT NULL
        );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "workout sets" ist aufgetreten:', error);
    }
};

const createTemplateTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS templates (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            description TEXT
        );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "template" ist aufgetreten:', error);
    }
};

const createTemplateExerciseTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS template_exercises (
            id SERIAL PRIMARY KEY,
            template_id INT REFERENCES templates(id) ON DELETE CASCADE,
            global_exercise_id INT REFERENCES global_exercises(id) ON DELETE CASCADE,
            user_exercise_id INT REFERENCES user_exercises(id) ON DELETE CASCADE
        );
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "template exercise" ist aufgetreten:', error);
    }
};

const createTemplateSetsTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS template_sets (
            id SERIAL PRIMARY KEY,
            template_exercise_id INT REFERENCES template_exercises(id) ON DELETE CASCADE,
            reps INT NOT NULL,
            weight DECIMAL,
            set_number INT NOT NULL
        );
        
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "template sets" ist aufgetreten:', error);
    }
};

const createTemplateShareTable = async () => {
    try {
        const query = `       
        CREATE TABLE IF NOT EXISTS template_sets (
            id SERIAL PRIMARY KEY,
            template_exercise_id INT REFERENCES template_exercises(id) ON DELETE CASCADE,
            reps INT NOT NULL,
            weight DECIMAL,
            set_number INT NOT NULL
        );
        
        `;

        await db.query(query);
    } catch (error) {
        console.error('Ein Fehler beim erstellen der Tabelle "template share" ist aufgetreten:', error);
    }
};





    module.exports = db



    


    
    

    

    
    
    
    
    
    
    


