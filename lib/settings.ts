import { prisma } from '@/lib/db/prisma';

export async function getSetting(
  key: string,
  defaultValue: string
): Promise<string> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { id: key },
    });
    return setting?.value ?? defaultValue;
  } catch (error) {
    // In case of database errors, return default value
    console.error(`Failed to get setting ${key}:`, error);
    return defaultValue;
  }
}

export async function getMaxMessageLength(): Promise<number> {
  const value = await getSetting('maxMessageLength', '16000');
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed < 1 ? 16000 : parsed;
}
