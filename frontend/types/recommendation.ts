import { z } from 'zod'

// AI Analysis Schema
export const AIAnalysisSchema = z.object({
  skinTone: z.enum(['fair', 'light', 'medium', 'deep', 'unknown']),
  undertone: z.enum(['cool', 'warm', 'neutral', 'unknown']),
  faceShape: z.enum([
    'oval',
    'round',
    'square',
    'heart',
    'oblong',
    'unknown',
  ]),
  lipShape: z.enum(['thin', 'full', 'asymmetrical', 'unknown']),
  eyeColor: z.string().optional(),
  hairColor: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  ageGroup: z.enum(['teen', '20s', '30s', '40s', '50+', 'unknown']).optional(),
})

export type AIAnalysis = z.infer<typeof AIAnalysisSchema>

// Recommendation Schema
export const RecommendationSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  productId: z.string(),
  matchScore: z.number().min(0).max(100),
  category: z.string(),
  reason: z.string(),
  aiAnalysis: AIAnalysisSchema,
  recommendedAt: z.date().optional(),
  userFeedback: z.enum(['helpful', 'not_helpful', 'purchased']).optional(),
})

export type Recommendation = z.infer<typeof RecommendationSchema>

// Recommendation Request Schema
export const RecommendationRequestSchema = z.object({
  userId: z.string(),
  aiAnalysis: AIAnalysisSchema,
  tryOnProductId: z.string(),
  categories: z.array(z.string()).optional(),
  limit: z.number().default(20),
})

export type RecommendationRequest = z.infer<typeof RecommendationRequestSchema>

// Recommendation Response Schema
export const RecommendationResponseSchema = z.object({
  perfectMatches: z.array(z.any()),
  budgetProducts: z.array(z.any()),
  premiumPicks: z.array(z.any()),
  trendingProducts: z.array(z.any()),
  similarShades: z.array(z.any()),
  frequentlyBoughtTogether: z.array(z.any()),
  recentlyViewed: z.array(z.any()),
})

export type RecommendationResponse = z.infer<
  typeof RecommendationResponseSchema
>
