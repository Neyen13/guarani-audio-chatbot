const whisper = require('@openai/whisper');
const fs = require('fs');

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