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
      description: "O texto introdutório exato fornecido nas instruções.",
    },
    keyConcepts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de conceitos chave abordados.",
    },
    examples: {
      type: Type.ARRAY,
      description: "Lista de EXATAMENTE 5 exemplos práticos com analogias.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título do exemplo (ex: Construtores como Receitas)" },
          analogy: { type: Type.STRING, description: "Uma analogia criativa da vida real explicando o conceito em detalhes." },
          code: { type: Type.STRING, description: "Código Python prático, extenso e bem comentado." },
          explanation: { type: Type.STRING, description: "Explicação técnica detalhada de como o código funciona linha a linha." },
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
      Atue como um Professor Sênior de Engenharia de Software criando um material didático completo.
      
      TÍTULO DA AULA: "Orientação a Objetos"
      
      INTRODUÇÃO OBRIGATÓRIA (Use este texto exato na introdução):
      "No próximo passo, você vai adquirir um sólido conhecimento em orientação a objetos e em boas práticas de programação com Python. Durante esse processo, você compreenderá os principais conceitos do paradigma de orientação a objetos, tais como classes, construtores, propriedades e diferentes tipos de métodos, bem como a integração entre classes. Aprenderá a aplicar esses conceitos no seu dia a dia de programação, aprimorando suas habilidades e garantindo códigos eficientes e organizados."
      
      CONTEÚDO TÉCNICO NECESSÁRIO (De cabo a rabo):
      1. Classes e Objetos (A base).
      2. Construtores (__init__) e self.
      3. Propriedades (Getters/Setters/@property).
      4. Métodos de Instância vs Métodos de Classe (@classmethod).
      5. Integração/Associação entre classes (Um objeto usando outro).

      REGRAS PARA EXEMPLOS:
      - Gere EXATAMENTE 5 exemplos práticos e distintos.
      - CADA exemplo deve ter uma "Analogia da Vida Real" muito clara (ex: Carro, Casa, Restaurante, Videogame, Conta Bancária).
      - Os códigos devem ser didáticos e funcionais.
    `;
  } else {
    prompt = `
      Atue como um Professor Sênior de Engenharia de Software criando um material didático completo.
      
      TÍTULO DA AULA: "Ambientes virtuais, arquivos e APIs"
      
      INTRODUÇÃO OBRIGATÓRIA (Use este texto exato na introdução):
      "Neste último passo da formação, você avançará em seus conhecimentos em Python e orientação a objetos, aplicando conceitos fundamentais como herança e polimorfismo. Além disso, será abordada a importância de isolar dependências e módulos por meio da criação de ambientes virtuais. Você também terá a oportunidade de desenvolver sua primeira API com Python!"
      
      CONTEÚDO TÉCNICO NECESSÁRIO (De cabo a rabo):
      1. Herança (Conceito de pai/filho).
      2. Polimorfismo (Mesmo método, comportamentos diferentes).
      3. Ambientes Virtuais (venv) - Por que isolar projetos?
      4. Manipulação de Arquivos (open, with, read, write).
      5. Criação de API (Conceito de Request/Response, JSON).

      REGRAS PARA EXEMPLOS:
      - Gere EXATAMENTE 5 exemplos práticos e distintos.
      - CADA exemplo deve ter uma "Analogia da Vida Real" (ex: Herança Genética, Sala Esterilizada para venv, Arquivo como um Diário, API como um Garçom).
      - Os códigos devem ser didáticos e funcionais.
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
        temperature: 0.2, // Baixa temperatura para seguir estritamente o roteiro
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