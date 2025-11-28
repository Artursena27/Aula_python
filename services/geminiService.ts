import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentType, LessonContent } from "../types";

// Define the schema for the AI response to ensure strict JSON structure
const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "O título da aula.",
    },
    introduction: {
      type: Type.STRING,
      description: "Uma introdução didática e detalhada sobre o tópico.",
    },
    keyConcepts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de 3 a 5 conceitos chave abordados.",
    },
    examples: {
      type: Type.ARRAY,
      description: "Lista de 4 a 5 exemplos práticos com analogias.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título do exemplo (ex: Construtores como Receitas)" },
          analogy: { type: Type.STRING, description: "Uma analogia criativa da vida real explicando o conceito." },
          code: { type: Type.STRING, description: "Código Python prático e bem comentado." },
          explanation: { type: Type.STRING, description: "Explicação técnica do que o código faz." },
        },
        required: ["title", "analogy", "code", "explanation"],
      },
    },
  },
  required: ["title", "introduction", "keyConcepts", "examples"],
};

export const fetchLessonContent = async (type: ContentType): Promise<LessonContent> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key não encontrada. Por favor, configure a variável de ambiente API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let prompt = "";

  if (type === ContentType.OOP) {
    prompt = `
      Crie uma aula detalhada sobre Orientação a Objetos em Python.
      
      Tópicos obrigatórios:
      - Classes e Objetos
      - Construtores (__init__)
      - Propriedades e self
      - Métodos (Instância vs Classe)
      - Integração entre classes
      
      Requisitos:
      - Linguagem: Português do Brasil.
      - Tom: Didático, encorajador e profissional (Senior Engineer ensinando Junior).
      - Gere EXATAMENTE 5 exemplos práticos.
      - CADA exemplo deve ter uma "Analogia da Vida Real" criativa (ex: Carro, Casa, Restaurante, Videogame).
    `;
  } else {
    prompt = `
      Crie uma aula detalhada sobre Ambientes Virtuais, Arquivos e APIs em Python.
      
      Tópicos obrigatórios:
      - Herança e Polimorfismo (Conceitos avançados de OO aplicados)
      - Ambientes Virtuais (venv) - Por que isolar?
      - Manipulação de Arquivos (open, with)
      - Criação de uma API simples (explicar o conceito de request/response)
      
      Requisitos:
      - Linguagem: Português do Brasil.
      - Tom: Didático, encorajador e profissional.
      - Gere EXATAMENTE 5 exemplos práticos cobrindo os tópicos acima.
      - CADA exemplo deve ter uma "Analogia da Vida Real" (ex: Herança biológica, Sala esterilizada para venv, Arquivo como gaveta, API como garçom).
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
        temperature: 0.3, // Low temperature for consistent educational content
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Resposta vazia da IA.");
    }
    
    return JSON.parse(text) as LessonContent;
  } catch (error) {
    console.error("Erro ao gerar aula:", error);
    throw error;
  }
};