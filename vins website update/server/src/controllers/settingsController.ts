import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface SettingRow extends RowDataPacket {
  setting_key: string;
  setting_value: any;
}

export async function getAllSettings(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<SettingRow[]>('SELECT * FROM site_settings');
    const settingsMap: Record<string, any> = {};
    rows.forEach((r) => {
      let val = r.setting_value;
      if (typeof val === 'string') {
        try {
          val = JSON.parse(val);
        } catch {
          // Keep as string
        }
      }
      settingsMap[r.setting_key] = val;
    });
    return res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch settings from MySQL',
      error: error.message,
    });
  }
}

export async function getSettingByKey(req: Request, res: Response) {
  try {
    const { key } = req.params;
    const rows = await executeQuery<SettingRow[]>(
      'SELECT setting_value FROM site_settings WHERE setting_key = ? LIMIT 1',
      [key]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }
    let val = rows[0].setting_value;
    if (typeof val === 'string') {
      try {
        val = JSON.parse(val);
      } catch {
        // Keep as string
      }
    }
    return res.json({ success: true, data: val });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch setting from MySQL',
      error: error.message,
    });
  }
}

export async function updateSetting(req: Request, res: Response) {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const jsonValue = JSON.stringify(value);

    await executeQuery<ResultSetHeader>(
      `INSERT INTO site_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [key, jsonValue]
    );

    return res.json({
      success: true,
      message: `Setting "${key}" updated successfully in MySQL`,
      data: value,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update setting',
      error: error.message,
    });
  }
}
