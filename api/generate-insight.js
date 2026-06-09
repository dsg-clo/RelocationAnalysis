import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { delta, existName, candName, spatialDensity, marketRisk } = req.body;

  try {
    // API Key dibaca aman dari Environment Variable di server
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Anda adalah seorang Senior Data Scientist dan Ahli Strategi Jaringan Kantor Bank. 
    Berikan analisis eksekutif singkat (maksimal 3 kalimat) mengenai rencana relokasi ini:
    - Nama Kantor Eksisting: ${existName}
    - Nama Lokasi Kandidat: ${candName}
    - Selisih Nilai Matriks (Delta): ${delta} poin
    - Kerapatan Kluster Spasial: ${spatialDensity}%
    - Risiko Saturasi Pasar: ${marketRisk}
    
    Berikan kesimpulan apakah relokasi ini taktis atau berisiko tinggi. Gunakan bahasa formal perbankan Indonesia.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({ insight: response.text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
