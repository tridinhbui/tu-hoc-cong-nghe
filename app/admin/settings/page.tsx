import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Cài đặt</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Cấu hình hệ thống
      </p>
      <div className="bg-white dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-16 flex flex-col items-center text-center">
        <Settings className="w-10 h-10 text-stone-300 dark:text-stone-700 mb-3" />
        <p className="font-semibold text-stone-600 dark:text-stone-400">Sắp ra mắt</p>
        <p className="text-sm text-stone-400 dark:text-stone-500 mt-1 max-w-sm">
          Cấu hình email thông báo, khóa API, và các tùy chọn hệ thống khác sẽ có mặt ở đây.
        </p>
      </div>
    </div>
  );
}
