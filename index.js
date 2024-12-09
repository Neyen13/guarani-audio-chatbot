const whisper = require('@openai/whisper');
const fs = require('fs');

// Importa Express.js
const express = require('express');
const app = express();

// Define el puerto desde la variable de entorno PORT o usa 8080 por defecto
const PORT = process.env.PORT || 8080;

// Configura una ruta básica para verificar que el servidor funcione
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Haz que el servidor escuche en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


exports.processAudio = async (req, res) => {
    try {
        // Simula recepción del archivo (ajustar para tu caso real)
        const audioBuffer = Buffer.from(req.body.audioBase64, 'base64');
        fs.writeFileSync('/tmp/audio.wav', audioBuffer);

        // Procesar el archivo con Whisper
        const result = await whisper.transcribe('/tmp/audio.wav', { language: 'gu' });
        const transcription = result.text;

        res.status(200).send({ transcription });
    } catch (error) {
        console.error('Error al procesar el audio:', error);
        res.status(500).send('Error procesando el audio');
    }
};