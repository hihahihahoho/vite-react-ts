import { describe, expect, it } from 'vitest';
import { isJson } from './utils/utils';

describe('isJson', () => {
	it('should return true for a valid JSON string', () => {
		const validJson = '{"key": "value"}';
		expect(isJson(validJson)).toBe(true);
	});

	it('should return false for an invalid JSON string', () => {
		const invalidJson = '{"key": "value",}';
		expect(isJson(invalidJson)).toBe(false);
	});

	it('should return false for a non-string input', () => {
		const nonStringInput = 12345;
		expect(isJson(nonStringInput)).toBe(false);
	});

	it('should return false for an empty string', () => {
		const emptyString = '';
		expect(isJson(emptyString)).toBe(false);
	});

	it('should return false for a null input', () => {
		const nullInput = null;
		expect(isJson(nullInput as unknown as string)).toBe(false);
	});

	it('should return false for an undefined input', () => {
		const undefinedInput = undefined;
		expect(isJson(undefinedInput as unknown as string)).toBe(false);
	});

	it('should return true for a valid JSON array', () => {
		const jsonArray = '[1, 2, 3]';
		expect(isJson(jsonArray)).toBe(true);
	});

	it('should return false for an invalid JSON array', () => {
		const invalidJsonArray = '[1, 2, 3,]';
		expect(isJson(invalidJsonArray)).toBe(false);
	});
});
