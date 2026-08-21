"use client";

import { useState, useCallback } from "react";
import { Appointment, AppointmentFormData, TimeSlot } from "@/types";
import { businessConfig } from "@/config/business";

// ─── Intervalo de citas en minutos ───────────────────────────
const SLOT_DURATION = 30;

// ─── Generar slots de un día ──────────────────────────────────
function generateSlots(
  open: string,
  close: string,
  takenSlots: string[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  for (let m = openMinutes; m < closeMinutes; m += SLOT_DURATION) {
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    const time = `${hh}:${mm}`;
    slots.push({ time, available: !takenSlots.includes(time) });
  }

  return slots;
}

// ─── Nombre del día en español ────────────────────────────────
function getDayName(date: Date): string {
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  return days[date.getDay()];
}

// ─── Hook principal ───────────────────────────────────────────
export function useAppointments() {
  // En producción, reemplazar este estado con llamadas a Supabase/Firebase/API
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<Appointment | null>(null);

  /**
   * Obtiene los slots disponibles para un barbero en una fecha.
   * TODO: Reemplazar con fetch a backend cuando exista.
   */
  const getAvailableSlots = useCallback(
    (barberId: string, dateStr: string): TimeSlot[] => {
      const date = new Date(dateStr + "T00:00:00");
      const dayName = getDayName(date);
      const daySchedule = businessConfig.hours[dayName];

      if (!daySchedule) return []; // Cerrado

      // Obtener citas ocupadas para ese barbero y fecha
      const taken = appointments
        .filter(
          (a) =>
            a.barberId === barberId &&
            a.date === dateStr &&
            a.status !== "cancelled"
        )
        .map((a) => a.time);

      return generateSlots(daySchedule.open, daySchedule.close, taken);
    },
    [appointments]
  );

  /**
   * Crea una nueva cita.
   * TODO: Reemplazar con POST a backend cuando exista.
   */
  const createAppointment = useCallback(
    (
      data: AppointmentFormData,
      serviceName: string,
      barberName: string
    ): Appointment => {
      // Verificar disponibilidad
      const slots = getAvailableSlots(data.barberId, data.date);
      const slot = slots.find((s) => s.time === data.time);
      if (!slot?.available) {
        throw new Error("Ese horario ya no está disponible. Elige otro.");
      }

      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        ...data,
        serviceName,
        barberName,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setAppointments((prev) => [...prev, newAppointment]);
      setConfirmedAppointment(newAppointment);
      return newAppointment;
    },
    [getAvailableSlots]
  );

  /**
   * Cancela una cita.
   */
  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }, []);

  return {
    appointments,
    confirmedAppointment,
    setConfirmedAppointment,
    getAvailableSlots,
    createAppointment,
    cancelAppointment,
  };
}
