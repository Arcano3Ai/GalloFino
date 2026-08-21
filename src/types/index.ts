// ─── Tipos globales de Gallo Fino Barber ─────────────────────

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  clientName: string;
  clientPhone: string;
  clientWhatsapp: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface TimeSlot {
  time: string; // "HH:MM"
  available: boolean;
  appointment?: Appointment;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayName: string;
  slots: TimeSlot[];
  isOpen: boolean;
}

export interface AppointmentFormData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientWhatsapp: string;
  notes: string;
}

export type GalleryCategory =
  | "todos"
  | "fade"
  | "barba"
  | "clasicos"
  | "designs"
  | "transformaciones";

export interface GalleryItem {
  id: number;
  category: string;
  src: string;
  alt: string;
}

export type MerchCategory = "todos" | "cabello" | "barba" | "ropa" | "kits";

export interface MerchItem {
  id: string;
  category: MerchCategory;
  priceMxn: string;
  priceUsd: string;
  image: string;
  icon: string;
  badge?: string;
  featured?: boolean;
}
