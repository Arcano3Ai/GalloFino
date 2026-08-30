"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { businessConfig } from "@/config/business";
import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentFormData, Appointment } from "@/types";
import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

// ─── Helpers ──────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getNext14Days(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function getDayName(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return days[date.getDay()];
}

function isDayOpen(dateStr: string): boolean {
  const dayName = getDayName(dateStr);
  return !!businessConfig.hours[dayName];
}

// ─── Step Indicator ───────────────────────────────────────────
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`
            w-8 h-8 flex items-center justify-center text-xs font-bold border transition-all duration-300
            ${i + 1 <= currentStep
              ? "bg-gold border-gold text-black"
              : "bg-transparent border-white/20 text-cream-muted"
            }
          `}>
            {i + 1 <= currentStep ? (i + 1 < currentStep ? "✓" : i + 1) : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`flex-1 h-px w-8 transition-all duration-300 ${i + 1 < currentStep ? "bg-gold" : "bg-white/10"}`} />
          )}
        </div>
      ))}
      <span className="ml-3 text-cream-muted text-xs tracking-wider uppercase">
        Paso {currentStep} de {totalSteps}
      </span>
    </div>
  );
}

// ─── Confirmation View ────────────────────────────────────────
function ConfirmationView({
  appointment,
  onReset,
}: {
  appointment: Appointment;
  onReset: () => void;
}) {
  const serviceObj = businessConfig.services.find(s => s.id === appointment.serviceId);
  const serviceImg = serviceObj?.image
    ? `https://raw.githubusercontent.com/Arcano3Ai/GalloFino/main/public${serviceObj.image}`
    : "https://raw.githubusercontent.com/Arcano3Ai/GalloFino/main/public/assets/logo.jpeg";

  const waMsg = [
    `💈 *GALLO FINO BARBER — CONFIRMACIÓN DE CITA* 💈`,
    `✂ *Servicio:* ${appointment.serviceName}`,
    `👤 *Cliente:* ${appointment.clientName}`,
    `💈 *Barbero:* ${appointment.barberName}`,
    `📅 *Fecha:* ${formatDate(appointment.date)}`,
    `⏰ *Hora:* ${appointment.time}`,
    ``,
    `📸 *Imagen del servicio:*`,
    `${serviceImg}`,
    ``,
    `🌐 *Ver servicio en web:*`,
    `https://gallo-fino-barber.vercel.app/servicios/${appointment.serviceId}`
  ].join("\n");
  const waUrl = getWhatsAppUrl(waMsg, businessConfig.whatsapp);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cita+Gallo+Fino+Barber+-+${encodeURIComponent(appointment.serviceName)}&dates=${appointment.date.replace(/-/g, "")}T${appointment.time.replace(":", "")}00/${appointment.date.replace(/-/g, "")}T${appointment.time.replace(":", "")}00&details=Barbero:+${encodeURIComponent(appointment.barberName)}&location=${encodeURIComponent(businessConfig.address + ", " + businessConfig.city)}`;

  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-6">🐓</div>
      <h3 className="font-brand text-2xl text-gold font-bold mb-2">
        ¡CITA CONFIRMADA, COMPA!
      </h3>
      <p className="text-cream-muted text-sm mb-8">
        Tu cita fue registrada. Te esperamos puntual.
      </p>

      <div className="bg-darkgray border border-gold/20 p-6 text-left mb-8 max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-cream-muted text-xs tracking-wider uppercase mb-1">Servicio</p>
            <p className="text-cream font-semibold">{appointment.serviceName}</p>
          </div>
          <div>
            <p className="text-cream-muted text-xs tracking-wider uppercase mb-1">Barbero</p>
            <p className="text-cream font-semibold">{appointment.barberName}</p>
          </div>
          <div>
            <p className="text-cream-muted text-xs tracking-wider uppercase mb-1">Fecha</p>
            <p className="text-cream font-semibold">{formatDate(appointment.date)}</p>
          </div>
          <div>
            <p className="text-cream-muted text-xs tracking-wider uppercase mb-1">Hora</p>
            <p className="text-gold font-brand font-bold text-lg">{appointment.time}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs py-3 px-5"
        >
          📅 Agregar al Calendario
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp text-xs py-3 px-5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirmar por WhatsApp
        </a>
      </div>

      <button
        onClick={onReset}
        className="mt-6 text-cream-muted hover:text-cream text-xs underline transition-colors"
      >
        Agendar otra cita
      </button>
    </div>
  );
}

// ─── Main Appointments Component ──────────────────────────────
export function Appointments() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AppointmentFormData>({
    serviceId: "",
    barberId: "",
    date: "",
    time: "",
    clientName: "",
    clientPhone: "",
    clientWhatsapp: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    getAvailableSlots,
    createAppointment,
    confirmedAppointment,
    setConfirmedAppointment,
  } = useAppointments();

  const availableDates = useMemo(() => getNext14Days(), []);
  const availableSlots = useMemo(() => {
    if (!form.date || !form.barberId) return [];
    return getAvailableSlots(form.barberId, form.date);
  }, [form.date, form.barberId, getAvailableSlots]);

  const selectedService = businessConfig.services.find((s) => s.id === form.serviceId);
  const selectedBarber = businessConfig.barbers.find((b) => b.id === form.barberId);

  const canProceedStep1 = !!form.serviceId;
  const canProceedStep2 = !!form.barberId;
  const canProceedStep3 = !!form.date;
  const canProceedStep4 = !!form.time;
  const canProceedStep5 =
    !!form.clientName && !!form.clientPhone;

  const handleReset = () => {
    setStep(1);
    setForm({ serviceId: "", barberId: "", date: "", time: "", clientName: "", clientPhone: "", clientWhatsapp: "", notes: "" });
    setError(null);
    setConfirmedAppointment(null);
  };

  const handleSubmit = async () => {
    if (!canProceedStep5) return;
    setIsSubmitting(true);
    setError(null);
    try {
      createAppointment(form, selectedService!.name, selectedBarber!.name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="citas" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-4">{t.appointments.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.appointments.titleMain} <span className="text-gold">{t.appointments.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">🐓</div>
          <p className="text-cream-muted text-base mt-4">
            {t.appointments.subtitle}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-dark border border-gold/20 p-8 sm:p-10">

          {confirmedAppointment ? (
            <ConfirmationView
              appointment={confirmedAppointment}
              onReset={handleReset}
            />
          ) : (
            <>
              <StepIndicator currentStep={step} totalSteps={5} />

              {/* STEP 1: Servicio */}
              {step === 1 && (
                <div>
                  <h3 className="font-brand text-cream text-xl mb-6">
                    1. Selecciona tu servicio
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {businessConfig.services.map((service) => {
                      const itemT = t.services.items[service.id as keyof typeof t.services.items];
                      return (
                        <button
                          key={service.id}
                          onClick={() => setForm((f) => ({ ...f, serviceId: service.id }))}
                          className={`
                            text-left p-4 border transition-all duration-200
                            ${form.serviceId === service.id
                              ? "border-gold bg-gold/10 text-cream"
                              : "border-white/10 hover:border-gold/40 text-cream-muted"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{service.icon}</span>
                            {service.popular && (
                              <span className="text-[9px] bg-gold text-black px-2 py-0.5 font-bold tracking-wider">
                                {t.services.popularBadge}
                              </span>
                            )}
                          </div>
                          <div className="font-brand font-bold text-sm tracking-wider">{itemT.name}</div>
                          <div className="text-xs mt-1 opacity-70">{itemT.description}</div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-gold font-bold text-sm">{itemT.price}</span>
                            <span className="text-xs opacity-60">⏱ {service.duration}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Barbero */}
              {step === 2 && (
                <div>
                  <h3 className="font-brand text-cream text-xl mb-6">
                    2. Elige tu barbero
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {businessConfig.barbers.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => setForm((f) => ({ ...f, barberId: barber.id }))}
                        className={`
                          p-5 border text-center transition-all duration-200 flex flex-col items-center
                          ${form.barberId === barber.id
                            ? "border-gold bg-gold/10 ring-1 ring-gold"
                            : "border-white/10 hover:border-gold/40"
                          }
                        `}
                      >
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gold/40">
                          <Image
                            src={barber.image}
                            alt={barber.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-brand text-cream text-sm font-bold tracking-wider">
                          {barber.name}
                        </div>
                        <div className="text-gold text-[10px] tracking-wider uppercase mt-1">
                          {barber.specialty}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Fecha */}
              {step === 3 && (
                <div>
                  <h3 className="font-brand text-cream text-xl mb-6">
                    3. Selecciona la fecha
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableDates.map((date) => {
                      const open = isDayOpen(date);
                      const d = new Date(date + "T00:00:00");
                      const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                      return (
                        <button
                          key={date}
                          onClick={() => open && setForm((f) => ({ ...f, date, time: "" }))}
                          disabled={!open}
                          className={`
                            p-3 border text-center transition-all duration-200
                            ${!open
                              ? "border-white/5 opacity-30 cursor-not-allowed"
                              : form.date === date
                                ? "border-gold bg-gold/10 text-cream"
                                : "border-white/10 hover:border-gold/40 text-cream-muted cursor-pointer"
                            }
                          `}
                        >
                          <div className="text-xs opacity-70">{dayNames[d.getDay()]}</div>
                          <div className="font-bold text-lg">{d.getDate()}</div>
                          <div className="text-[10px] opacity-60">{monthNames[d.getMonth()]}</div>
                          {!open && <div className="text-[9px] text-wine-light mt-1">Cerrado</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Horario */}
              {step === 4 && (
                <div>
                  <h3 className="font-brand text-cream text-xl mb-2">
                    4. Selecciona el horario
                  </h3>
                  {form.date && (
                    <p className="text-cream-muted text-sm mb-6">
                      {formatDate(form.date)}
                    </p>
                  )}
                  {availableSlots.length === 0 ? (
                    <p className="text-cream-muted text-sm">
                      No hay horarios disponibles para esta fecha. Selecciona otro día.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setForm((f) => ({ ...f, time: slot.time }))}
                          disabled={!slot.available}
                          className={`
                            py-2.5 px-2 text-sm font-bold border text-center transition-all duration-200
                            ${!slot.available
                              ? "border-white/5 opacity-30 cursor-not-allowed line-through text-cream-muted"
                              : form.time === slot.time
                                ? "border-gold bg-gold text-black cursor-pointer"
                                : "border-white/10 hover:border-gold/40 text-cream cursor-pointer"
                            }
                          `}
                        >
                          {slot.time}
                          {!slot.available && (
                            <div className="text-[8px] block mt-0.5 text-wine">OCUPADO</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Legend */}
                  <div className="flex gap-4 mt-6 text-xs text-cream-muted">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border border-gold/40" />
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-gold" />
                      <span>Seleccionado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border border-white/5 opacity-30" />
                      <span>Ocupado</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Datos del cliente */}
              {step === 5 && (
                <div>
                  <h3 className="font-brand text-cream text-xl mb-6">
                    5. Tus datos
                  </h3>

                  {/* Resumen */}
                  <div className="bg-darkgray border border-gold/10 p-4 mb-6 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-cream-muted text-xs block">Servicio</span>
                        <span className="text-cream font-semibold">{selectedService?.name}</span>
                      </div>
                      <div>
                        <span className="text-cream-muted text-xs block">Barbero</span>
                        <span className="text-cream font-semibold">{selectedBarber?.name}</span>
                      </div>
                      <div>
                        <span className="text-cream-muted text-xs block">Fecha</span>
                        <span className="text-cream font-semibold">
                          {form.date ? formatDate(form.date) : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-cream-muted text-xs block">Hora</span>
                        <span className="text-gold font-brand font-bold text-lg">{form.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "clientName", label: "Nombre completo *", type: "text", key: "clientName" },
                      { id: "clientPhone", label: "Teléfono *", type: "tel", key: "clientPhone" },
                      { id: "clientWhatsapp", label: "WhatsApp", type: "tel", key: "clientWhatsapp" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="text-cream-muted text-xs tracking-wider uppercase block mb-2">
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          value={form[field.key as keyof AppointmentFormData]}
                          onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                          className="
                            w-full bg-darkgray border border-white/10
                            focus:border-gold focus:outline-none
                            text-cream px-4 py-3 text-sm
                            transition-colors placeholder-cream-muted/40
                          "
                          placeholder={field.label.replace(" *", "")}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className="text-cream-muted text-xs tracking-wider uppercase block mb-2">
                        Notas adicionales
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        className="
                          w-full bg-darkgray border border-white/10
                          focus:border-gold focus:outline-none
                          text-cream px-4 py-3 text-sm
                          transition-colors resize-none placeholder-cream-muted/40
                        "
                        placeholder="Tipo de corte, estilo preferido, referencias..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 border border-wine/50 bg-wine/10 text-wine-light text-sm">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-8 border-t border-white/5">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-outline text-xs py-2.5 px-6"
                  >
                    ← Atrás
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={
                      (step === 1 && !canProceedStep1) ||
                      (step === 2 && !canProceedStep2) ||
                      (step === 3 && !canProceedStep3) ||
                      (step === 4 && !canProceedStep4)
                    }
                    className="btn-primary text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceedStep5 || isSubmitting}
                    className="btn-primary text-xs py-2.5 px-8 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Confirmando..." : "✓ CONFIRMAR CITA"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
