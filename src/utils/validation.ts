import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MAX_TAG_LENGTH } from '../constants';

/**
 * Validates if a string is a valid URL
 */
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validates if a title meets length requirements
 */
export const validateTitle = (title: string): boolean => {
  const trimmed = title.trim();
  return trimmed.length >= MIN_TITLE_LENGTH && trimmed.length <= MAX_TITLE_LENGTH;
};

/**
 * Validates if a tag is acceptable
 */
export const validateTag = (tag: string): boolean => {
  const trimmed = tag.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_TAG_LENGTH;
};

/**
 * Sanitizes input by trimming and removing potentially dangerous content
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, ''); // Remove iframe tags
};

/**
 * Formats tags from comma-separated string to array
 */
export const formatTags = (tagsString: string, maxTags: number = 10): string[] => {
  return tagsString
    .split(',')
    .map(tag => sanitizeInput(tag))
    .filter(tag => validateTag(tag))
    .slice(0, maxTags);
};