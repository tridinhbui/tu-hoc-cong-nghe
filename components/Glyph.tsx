import { createElement } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Accessibility, AlarmClock, Anchor, AppWindow, Archive, ArrowDownRight, ArrowLeftRight, ArrowUpRight, Award,
  Ban, Bandage, Banknote, BarChart3, BatteryLow, Bell, Blocks, Book, BookOpen, Bot, Box, Brain, Briefcase,
  Brush, Bug, Building, Building2, Cake, Calculator, CalendarDays, Car, Castle, Check, Circle, CircleCheck,
  CircleDashed, CircleDot, Clapperboard, ClipboardList, Clock, Cloud, Coffee, Coins,
  Compass, Construction, Contact, CreditCard, Crown, Database, Dices, Divide, Dna, DoorOpen, Download,
  Drama, Droplet, Dumbbell, Egg, Eye, EyeOff, FileText, Files, FireExtinguisher, Flag, Flame,
  FlaskConical, Folder, FolderTree, Gem, Ghost, Gift, Glasses, Globe, GraduationCap, Hand, Handshake,
  Heart, Home, Hourglass, IdCard, Key, Keyboard, Landmark, Laptop, Layers, Leaf, Lightbulb, Link, Lock,
  LockKeyhole, LockOpen, Mail, Mailbox, Map, MapPin, Medal, Megaphone, MessageSquare, Mic, Microscope,
  Monitor, Moon, Mountain, MousePointer, Network, Notebook, Package, PaintBucket, Palette,
  PartyPopper, PenLine, PenTool, Phone, Pin, Plug, Plus, Puzzle, Receipt, RefreshCw, Repeat,
  Rewind, Ribbon, Rocket, Ruler, Satellite, Save, Scale, ScanSearch, Scissors, ScrollText, Search,
  Settings, Shield, Ship, Shirt, ShoppingCart, Shuffle, Signal, Siren, Skull, SlidersHorizontal, Smartphone,
  Smile, Snowflake, Sparkles, Sprout, Square, Stethoscope, Swords, Tag, Target, Ticket, Timer, Tornado,
  Toolbox, TreePine, Trees, TrendingDown, TrendingUp, TriangleAlert, Trophy, Truck, Turtle, Type, Undo2,
  Upload, User, Users, Utensils, Volume1, Volume2, VolumeX, Watch, Waves, Wine, Wrench, X, Zap, Armchair,
} from "lucide-react";

/**
 * Emoji → icon Lucide. Giao diện không vẽ emoji nữa (đọc là "quê", và mỗi hệ
 * điều hành vẽ một kiểu), nhưng DỮ LIỆU vẫn giữ emoji: `emoji`, `iconEmoji`,
 * `badgeEmoji`… nằm trong lib/*.ts và một phần đã ghi vào cơ sở dữ liệu làm
 * khoá (logo guild, emoji bài học). Đổi dữ liệu là mồ côi những dòng đã lưu;
 * đổi cách VẼ thì không. Nên mọi chỗ hiển thị một trường emoji đi qua đây.
 *
 * Emoji chưa có trong bảng rơi về một chấm tròn trung tính - không bao giờ
 * vẽ lại glyph gốc. Thêm emoji mới vào dữ liệu thì thêm một dòng ở đây.
 */
const MAP: Record<string, LucideIcon> = {
  // số liệu, phân tích
  "📊": BarChart3, "📈": TrendingUp, "📉": TrendingDown, "💹": TrendingUp, "🧮": Calculator, "📐": Ruler,
  "📏": Ruler, "🔢": Type, "➗": Divide, "➕": Plus, "🎚️": SlidersHorizontal, "🎛️": SlidersHorizontal,
  "↗️": ArrowUpRight, "↘️": ArrowDownRight, "↔️": ArrowLeftRight, "🔻": TrendingDown, "🔶": CircleDot,
  // mục tiêu, thành tích
  "🎯": Target, "🏆": Trophy, "👑": Crown, "🥇": Medal, "🥈": Medal, "🥉": Medal, "🎖️": Award, "🏅": Medal,
  "🏁": Flag, "🚩": Flag, "🇻🇳": Flag, "⭐": Sparkles, "✨": Sparkles, "🎉": PartyPopper, "🎈": PartyPopper,
  "🎁": Gift, "🎗️": Ribbon, "🎫": Ticket, "🎟️": Ticket, "🔱": Crown, "💎": Gem, "🪙": Coins, "💰": Coins,
  "💵": Banknote, "💸": Banknote, "💱": ArrowLeftRight, "💳": CreditCard, "🏦": Landmark, "💼": Briefcase,
  // học tập, tài liệu
  "🎓": GraduationCap, "📚": BookOpen, "📖": BookOpen, "📗": Book, "📓": Notebook, "📒": Notebook,
  "📋": ClipboardList, "📄": FileText, "📃": FileText, "📑": Files, "📜": ScrollText, "🧾": Receipt,
  "📝": PenLine, "✍️": PenLine, "🖋️": PenTool, "🖊️": PenTool, "📇": Contact, "🪪": IdCard, "🗂️": FolderTree,
  "🗃️": Archive, "🗄️": Database, "📁": Folder, "📌": Pin, "📍": MapPin, "📎": Pin, "🔖": Tag, "🏷️": Tag,
  "💡": Lightbulb, "🧠": Brain, "🔬": Microscope, "🔭": Search, "🧪": FlaskConical, "🧬": Dna,
  "🔍": Search, "🔎": ScanSearch, "👀": Eye, "👁️": Eye, "🙈": EyeOff, "🫥": EyeOff, "🧐": Search,
  // kỹ thuật, hệ thống
  "🤖": Bot, "💻": Laptop, "🖥️": Monitor, "⌨️": Keyboard, "🖱️": MousePointer, "📱": Smartphone,
  "💾": Save, "🔌": Plug, "📡": Satellite, "🛰️": Satellite, "📶": Signal, "🌐": Globe, "🌏": Globe,
  "🔗": Link, "⛓️": Link, "🕸️": Network, "🧩": Puzzle, "🧱": Blocks, "📦": Package, "🧊": Box, "🔲": Square,
  "⚙️": Settings, "🛠️": Wrench, "🔧": Wrench, "🧰": Toolbox, "🔀": Shuffle, "🔄": RefreshCw, "🔁": Repeat,
  "↩️": Undo2, "⏪": Rewind, "📥": Download, "📤": Upload, "🪟": AppWindow, "🐞": Bug, "🐍": Bug,
  "🏗️": Construction, "🚧": Construction, "🗺️": Map, "🧭": Compass, "🪜": Layers, "🧵": Layers,
  "🪢": Link, "🧗": Mountain, "⛰️": Mountain, "🌋": Mountain, "☁️": Cloud, "🌪️": Tornado, "🌊": Waves,
  "💧": Droplet, "❄️": Snowflake, "🌙": Moon, "⚡": Zap, "🔥": Flame, "🧨": Zap, "🪫": BatteryLow,
  // bảo mật, rủi ro
  "🛡️": Shield, "🔒": Lock, "🔐": LockKeyhole, "🔑": Key, "🗝️": Key, "🔓": LockOpen, "⚠️": TriangleAlert,
  "🚨": Siren, "🆘": Siren, "🚫": Ban, "🛑": Ban, "❌": X, "🚦": Signal, "🚥": Signal, "🧯": FireExtinguisher,
  "🛟": Anchor, "⚓": Anchor, "🕳️": CircleDashed, "🪦": Skull, "👻": Ghost, "🩺": Stethoscope, "💉": Stethoscope,
  "🩹": Bandage, "♿": Accessibility,
  // kinh doanh, con người
  "⚖️": Scale, "🏛️": Landmark, "🏢": Building2, "🏬": Building2, "🏙️": Building2, "🌆": Building2,
  "🏚️": Building, "🏠": Home, "🏰": Castle, "🚪": DoorOpen, "🪑": Armchair, "🪞": Square, "🛒": ShoppingCart,
  "🚚": Truck, "🚢": Ship, "🏎️": Car, "🚀": Rocket, "🤝": Handshake, "👥": Users, "🧑‍🤝‍🧑": Users,
  "👤": User, "👔": Shirt, "🎽": Shirt, "🧥": Shirt, "👋": Hand, "💪": Dumbbell, "🏋️": Dumbbell,
  "👍": Check, "✅": CircleCheck, "✔️": Check, "❤️": Heart, "🤍": Heart, "😊": Smile, "😎": Smile, "😏": Smile,
  "🤓": Glasses, "👓": Glasses, "🕶️": Glasses, "🥽": Glasses, "😂": Smile,
  // giao tiếp, thời gian
  "📣": Megaphone, "📢": Megaphone, "🔔": Bell, "🗣️": MessageSquare, "🎙️": Mic, "📞": Phone,
  "✉️": Mail, "📨": Mail, "📬": Mailbox, "📮": Mailbox, "🔊": Volume2, "🔈": Volume1, "🔇": VolumeX,
  "⏳": Hourglass, "⌛": Hourglass, "⏱️": Timer, "⏲️": Timer, "⏰": AlarmClock, "⌚": Watch, "🕰️": Clock,
  "🕐": Clock, "📅": CalendarDays, "🗓️": CalendarDays,
  // tự nhiên, tăng trưởng
  "🌱": Sprout, "🌿": Leaf, "🌳": TreePine, "🌲": TreePine, "🦁": Crown, "🐉": Flame, "🦈": Waves,
  "🐂": TrendingUp, "🐢": Turtle, "🐼": Smile, "🐐": Trophy, "🥚": Egg,
  // trò chơi, sáng tạo
  "⚔️": Swords, "🎲": Dices, "🎭": Drama, "🎬": Clapperboard, "🎨": Palette, "🖌️": Brush, "🧹": Brush,
  "🪣": PaintBucket, "✂️": Scissors, "🔪": Utensils, "🧂": Utensils, "🧅": Utensils, "🍰": Cake, "🍷": Wine,
  "☕": Coffee, "📿": CircleDot, "🪆": Layers, "🎒": Briefcase, "🌲🌲": Trees,
  "🛢️": Database,
  "🔤": Type, "🧑‍🚀": Rocket,
};

export function glyphIcon(emoji: string | null | undefined): LucideIcon {
  if (!emoji) return Circle;
  return MAP[emoji] ?? MAP[emoji.replace(/️/g, "")] ?? MAP[`${emoji.replace(/️/g, "")}️`] ?? Circle;
}

/** Vẽ một trường emoji thành icon. `className` nhận cỡ và màu như mọi icon Lucide. */
export default function Glyph({ emoji, className = "w-5 h-5", strokeWidth = 1.75, ...rest }: { emoji: string | null | undefined } & LucideProps) {
  // createElement thay vì `const Icon = ...; <Icon />`: React Compiler coi
  // việc gán component vào biến trong lúc render là tạo component mới mỗi lần.
  return createElement(glyphIcon(emoji), { "aria-hidden": true, className, strokeWidth, ...rest });
}
