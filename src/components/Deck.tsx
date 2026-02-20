import { useState, useEffect, useCallback, useRef, type ReactNode, type CSSProperties, type MouseEvent as RME } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

const anim = (delay: number) => `anim anim-d${delay}`;

// ── Shared UI primitives ──────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p className={anim(1)} style={{ fontFamily: "Work Sans, sans-serif", fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: ".6rem" }}>
      {children}
    </p>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className={anim(2)} style={{ fontFamily: "Prompt, sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.2rem", color: "var(--white)" }}>
      {children}
    </h2>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>;
}

function Divider() {
  return <div className={anim(2)} style={{ width: 48, height: 2, background: "var(--grad)", borderRadius: 99, margin: "0 auto 1.4rem", opacity: .7 }} />;
}

function SlideContent({ children }: { children: ReactNode }) {
  return <div style={{ width: "100%", maxWidth: 980, textAlign: "center" }}>{children}</div>;
}

function GlassCard({ icon, title, children, style, delay = 3 }: { icon?: string; title?: string; children: ReactNode; style?: CSSProperties; delay?: number }) {
  return (
    <div className={cx("glass-card", anim(delay))} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: "1.3rem 1.4rem", backdropFilter: "blur(16px)", ...style }}>
      {icon && <span style={{ fontSize: "1.5rem", marginBottom: ".5rem", display: "block" }}>{icon}</span>}
      {title && <p style={{ fontFamily: "Prompt, sans-serif", fontSize: ".9rem", fontWeight: 600, color: "var(--cyan)", marginBottom: ".35rem" }}>{title}</p>}
      <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function ColBlock({ title, children, borderColor, delay = 3 }: { title: string; children: ReactNode; borderColor?: string; delay?: number }) {
  return (
    <div className={cx("glass-card", anim(delay))} style={{ background: "var(--card-bg)", border: `1px solid ${borderColor ?? "var(--card-border)"}`, borderRadius: 14, padding: "1.4rem" }}>
      <h3 style={{ fontFamily: "Prompt, sans-serif", fontSize: "1rem", fontWeight: 600, color: "var(--cyan)", marginBottom: ".7rem" }}>{title}</h3>
      <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span style={{ display: "inline-block", padding: ".25rem .7rem", borderRadius: 99, fontSize: ".7rem", fontWeight: 600, letterSpacing: ".04em", background: "rgba(26,196,252,.08)", border: "1px solid rgba(26,196,252,.2)", color: "var(--cyan)" }}>{children}</span>;
}

function Stat({ value, label, delay = 4 }: { value: string; label: string; delay?: number }) {
  return (
    <div className={anim(delay)} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 12, padding: ".8rem 1.4rem", textAlign: "center", minWidth: 140, backdropFilter: "blur(12px)" }}>
      <div style={{ fontFamily: "Prompt, sans-serif", fontSize: "1.5rem", fontWeight: 700, background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</div>
      <div style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: ".15rem" }}>{label}</div>
    </div>
  );
}

function HighlightBox({ children, delay = 5 }: { children: ReactNode; delay?: number }) {
  return (
    <div className={anim(delay)} style={{ background: "linear-gradient(135deg, rgba(26,196,252,.06), rgba(28,113,243,.06))", border: "1px solid rgba(26,196,252,.18)", borderRadius: 14, padding: "1.2rem 1.8rem", maxWidth: 820, marginTop: "1rem", textAlign: "center" }}>
      {children}
    </div>
  );
}

function CoverPill({ children }: { children: ReactNode }) {
  return (
    <div className={anim(1)} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".35rem .9rem", borderRadius: 99, border: "1px solid rgba(26,196,252,.2)", background: "rgba(26,196,252,.05)", fontSize: ".72rem", fontWeight: 500, color: "var(--cyan)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
      <span style={{ width: 5, height: 5, background: "var(--cyan)", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px var(--cyan)" }} />
      {children}
    </div>
  );
}

// ── SLIDE 1: COVER ────────────────────────────────────────────────────────────

function Slide1Cover() {
  return (
    <>
      <CoverPill>Investor Deck · 2026</CoverPill>
      <img className={anim(2)} src="/logo.png" alt="Clasy" style={{ width: 64, height: "auto", marginBottom: "1.4rem", filter: "drop-shadow(0 0 30px rgba(26,196,252,.5))" }} />
      <div className={anim(3)} style={{ fontFamily: "Prompt, sans-serif", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 800, lineHeight: 1, background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-.02em" }}>
        Clasy
      </div>
      <p className={anim(4)} style={{ fontFamily: "Work Sans, sans-serif", fontSize: "clamp(.9rem, 1.5vw, 1.15rem)", color: "var(--muted)", maxWidth: 560, textAlign: "center", lineHeight: 1.7, marginTop: ".8rem" }}>
        Marketplace que profesionaliza las tutorías universitarias<br />mediante conexión verificada y contenido híbrido escalable.
      </p>
      <div className={anim(5)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
        <Stat value="1.2M" label="Estudiantes en Chile" delay={5} />
        <Stat value="B2B2C" label="Modelo de crecimiento" delay={6} />
        <Stat value="AWS" label="Cloud-native · 100%" delay={7} />
      </div>
    </>
  );
}

// ── SLIDE 2: PROBLEM ──────────────────────────────────────────────────────────

function Slide2Problem() {
  const items = [
    { icon: "😰", title: "Alumnos contratan a ciegas", desc: "Se contactan por WhatsApp o Instagram sin garantía de calidad, arriesgando su rendimiento en ramos críticos." },
    { icon: "⏳", title: "Tutores atrapados en lo operativo", desc: "Gestionan cobros, agendas y links manualmente en lugar de enseñar. Alta fricción = bajo volumen de clases." },
    { icon: "🔗", title: "Oferta fragmentada y opaca", desc: "No existe estándar de calidad. Cualquiera se anuncia como tutor sin filtro académico ni verificación real." },
    { icon: "💸", title: "Transacciones sin protección", desc: "Pagos en efectivo o transferencia directa. El alumno paga sin garantía de recibir el servicio contratado." },
  ];
  return (
    <>
      <SlideContent>
        <Label>El Problema</Label>
        <Heading>El mercado de tutorías es <Accent>informal y riesgoso</Accent></Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: 920, width: "100%", marginTop: "1rem" }}>
        {items.map((p, i) => (
          <div key={p.title} className={cx("glass-card", anim(i + 3))} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: "1.4rem" }}>
            <span style={{ fontSize: "1.6rem", marginBottom: ".6rem", display: "block" }}>{p.icon}</span>
            <h3 style={{ fontFamily: "Prompt, sans-serif", fontSize: ".95rem", fontWeight: 600, marginBottom: ".35rem", color: "var(--white)" }}>{p.title}</h3>
            <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.58)", lineHeight: 1.65 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ── SLIDE 3: SOLUTION ─────────────────────────────────────────────────────────

function Slide3Solution() {
  return (
    <>
      <SlideContent>
        <Label>La Solución</Label>
        <Heading><Accent>Conexión verificada</Accent> + automatización total</Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 920, width: "100%", marginTop: "1rem" }}>
        <GlassCard icon="✅" title="Filtro de Talento Estricto" delay={3}>Centralizamos la oferta y verificamos académicamente a cada tutor antes de habilitarlo en la plataforma.</GlassCard>
        <GlassCard icon="⚡" title="Flujo 100% Automatizado" delay={4}>Agendamiento, cobros y aula virtual en una sola plataforma. Cero fricción para alumnos y tutores.</GlassCard>
        <GlassCard icon="🔒" title="Seguridad Transaccional" delay={5}>Pagos custodiados, confirmación de sesión y sistema de reseñas. El alumno siempre está protegido.</GlassCard>
      </div>
      <HighlightBox delay={6}>
        <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.8)" }}>
          <strong style={{ color: "var(--cyan)" }}>Resultado:</strong>&nbsp; Los mejores tutores universitarios, al alcance de cualquier alumno, con la misma facilidad que pedir un delivery.
        </p>
      </HighlightBox>
    </>
  );
}

// ── SLIDE 4: PRODUCT ──────────────────────────────────────────────────────────

function Slide4Product() {
  return (
    <>
      <SlideContent>
        <Label>El Producto</Label>
        <Heading>Tres <Accent>modalidades</Accent> de aprendizaje</Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 960, width: "100%", marginTop: "1rem" }}>
        <ColBlock title="🎙️ Clases Particulares en Vivo" delay={3}>
          Tutorías 1 a 1 para resolución quirúrgica de dudas del ramo. El alumno elige modalidad online o presencial según su preferencia.
          <div style={{ marginTop: ".8rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <Badge>1 a 1</Badge> <Badge>Online</Badge> <Badge>Presencial</Badge>
          </div>
        </ColBlock>
        <ColBlock title="🎬 Contenido Grabado" delay={4}>
          Cápsulas de micro-learning, guías y material de estudio disponible 24/7. Mantienen la retención cuando no hay clases en vivo programadas.
          <div style={{ marginTop: ".8rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <Badge>Cápsulas</Badge> <Badge>Guías</Badge> <Badge>24/7</Badge>
          </div>
        </ColBlock>
        <ColBlock title="👥 Clases Masivas" delay={5}>
          El tutor publica un horario y múltiples alumnos se inscriben. Mayor accesibilidad para el estudiante, mayor alcance para el profesor.
          <div style={{ marginTop: ".8rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <Badge>Grupal</Badge> <Badge>Agenda Pública</Badge> <Badge>Escalable</Badge>
          </div>
        </ColBlock>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: ".8rem", maxWidth: 960, width: "100%", marginTop: "1rem" }}>
        {[
          { icon: "📅", title: "Agendamiento" },
          { icon: "💳", title: "Cobros Integrados" },
          { icon: "🖥️", title: "Aula Virtual" },
          { icon: "📚", title: "Material de Estudio" },
        ].map((c, i) => (
          <div key={c.title} className={cx("glass-card", anim(i + 6))} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 12, padding: ".8rem", textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", display: "block", marginBottom: ".3rem" }}>{c.icon}</span>
            <p style={{ fontFamily: "Prompt, sans-serif", fontSize: ".75rem", fontWeight: 600, color: "var(--cyan)" }}>{c.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ── SLIDE 5: MARKET ───────────────────────────────────────────────────────────

function Slide5Market() {
  const desc = [
    { dot: "rgba(28,113,243,.7)", label: "TAM", text: "Mercado global de tutorías y EdTech en Latinoamérica. Segmento en aceleración post-pandemia." },
    { dot: "var(--cyan)", label: "SAM", text: "1.2 millones de estudiantes de educación superior en Chile que enfrentan ramos filtro cada semestre." },
    { dot: "#fff", label: "SOM", text: "Alumnos de carreras STEM en universidades de Santiago y Valparaíso. Nuestro beachhead inicial." },
  ];
  // Ring sizes — TAM outer, SAM mid, SOM inner with enough space to avoid overlap
  const OUTER = 280;
  const MID = 190;
  const INNER = 110;
  return (
    <>
      <SlideContent>
        <Label>Tamaño de Mercado</Label>
        <Heading>Una oportunidad <Accent>masiva y subatendida</Accent></Heading>
        <Divider />
      </SlideContent>
      <div className={anim(3)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3.5rem", marginTop: "1rem" }}>
        {/* Concentric rings */}
        <div style={{ position: "relative", width: OUTER, height: OUTER, flexShrink: 0 }}>
          {/* TAM */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(28,113,243,.3)", background: "rgba(28,113,243,.03)" }}>
            <span style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", fontFamily: "Prompt, sans-serif", fontSize: ".72rem", fontWeight: 700, color: "rgba(28,113,243,.75)", letterSpacing: ".06em" }}>TAM</span>
            <span style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", fontSize: ".6rem", color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>EdTech Latam</span>
          </div>
          {/* SAM */}
          <div style={{ position: "absolute", top: (OUTER - MID) / 2, left: (OUTER - MID) / 2, width: MID, height: MID, borderRadius: "50%", border: "1.5px solid rgba(26,196,252,.35)", background: "rgba(26,196,252,.04)" }}>
            <span style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", fontFamily: "Prompt, sans-serif", fontSize: ".72rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: ".04em" }}>SAM</span>
            <span style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", fontSize: ".58rem", color: "rgba(255,255,255,.4)", whiteSpace: "nowrap" }}>1.2M estudiantes Chile</span>
          </div>
          {/* SOM */}
          <div style={{ position: "absolute", top: (OUTER - INNER) / 2, left: (OUTER - INNER) / 2, width: INNER, height: INNER, borderRadius: "50%", border: "1.5px solid var(--cyan)", background: "rgba(26,196,252,.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Prompt, sans-serif", fontSize: ".75rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: ".04em" }}>SOM</span>
            <span style={{ fontSize: ".58rem", color: "rgba(255,255,255,.5)", marginTop: 2, textAlign: "center", lineHeight: 1.3 }}>STEM<br />SGO + VPO</span>
          </div>
        </div>
        {/* Descriptions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360 }}>
          {desc.map((d, i) => (
            <div key={d.label} className={anim(i + 4)} style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: d.dot, marginTop: ".3rem", flexShrink: 0, boxShadow: `0 0 8px ${d.dot}` }} />
              <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--white)" }}>{d.label}</strong> — {d.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── SLIDE 6: GTM ──────────────────────────────────────────────────────────────

function Slide6GTM() {
  return (
    <>
      <SlideContent>
        <Label>Go-To-Market y Tracción</Label>
        <Heading>Redes <Accent>Atómicas</Accent> + Alianzas B2B2C</Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: 920, width: "100%", marginTop: "1rem" }}>
        <ColBlock title="⚛️ Estrategia de Red Atómica" borderColor="rgba(26,196,252,.25)" delay={3}>
          Conquistamos quirúrgicamente <strong style={{ color: "var(--white)" }}>1 Facultad + Ramos críticos</strong> a la vez. Probamos liquidez antes de escalar a la siguiente red.
          <div style={{ marginTop: ".8rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <Badge>1 Facultad</Badge> <Badge>Ramos Críticos</Badge> <Badge>Liquidez Primero</Badge>
          </div>
        </ColBlock>
        <ColBlock title="🤝 Modelo B2B2C" borderColor="rgba(28,113,243,.25)" delay={4}>
          Alianzas con <strong style={{ color: "var(--white)" }}>Centros de Estudiantes y Federaciones</strong> (ej: FEPUCV) para validación institucional y captación masiva a bajo costo.
          <div style={{ marginTop: ".8rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <Badge>FEPUCV</Badge> <Badge>FEUC</Badge> <Badge>CAc</Badge>
          </div>
        </ColBlock>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 920, width: "100%", marginTop: "1rem" }}>
        <GlassCard icon="🎯" title="CAC reducido" style={{ textAlign: "center" }} delay={5}>Validación institucional lleva el costo de adquisición al mínimo</GlassCard>
        <GlassCard icon="🌊" title="Efecto de red" style={{ textAlign: "center" }} delay={6}>Más tutores → mejor oferta → más alumnos → más tutores</GlassCard>
        <GlassCard icon="📈" title="Playbook replicable" style={{ textAlign: "center" }} delay={7}>Mismo modelo, mismo proceso en cada nueva facultad</GlassCard>
      </div>
    </>
  );
}

// ── SLIDE 7: BUSINESS ─────────────────────────────────────────────────────────

function Slide7Business() {
  return (
    <>
      <SlideContent>
        <Label>Modelo de Negocios</Label>
        <Heading><Accent>Service fee</Accent> sobre cada transacción</Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: 860, width: "100%", marginTop: "1rem" }}>
        <ColBlock title="🎙️ Clases en Vivo — 15% fee" borderColor="rgba(26,196,252,.3)" delay={3}>
          Los tutores publican su servicio y fijan su precio. Clasy cobra un 15% adicional al alumno sobre el precio del profesor por cada clase particular o masiva agendada y pagada en la plataforma.
          <div style={{ marginTop: "1rem", background: "rgba(26,196,252,.05)", borderRadius: 10, padding: ".7rem .9rem" }}>
            <p style={{ fontSize: ".82rem", color: "var(--cyan)", fontWeight: 600 }}>El tutor recibe el 100% de su precio</p>
          </div>
        </ColBlock>
        <ColBlock title="🎬 Contenido Grabado — 25% fee" borderColor="rgba(28,113,243,.3)" delay={4}>
          Los tutores publican cápsulas, guías y material de estudio. Clasy cobra un 25% sobre el precio del contenido. Mayor margen por la escalabilidad infinita del inventario digital.
          <div style={{ marginTop: "1rem", background: "rgba(28,113,243,.05)", borderRadius: 10, padding: ".7rem .9rem" }}>
            <p style={{ fontSize: ".82rem", color: "#7baeff", fontWeight: 600 }}>Inventario infinito · alto margen · 24/7</p>
          </div>
        </ColBlock>
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
        <Stat value="15%" label="Fee en vivo" delay={5} />
        <Stat value="25%" label="Fee grabado" delay={6} />
        <Stat value="~0" label="Costo marginal" delay={7} />
        <Stat value="∞" label="Escalabilidad" delay={8} />
      </div>
    </>
  );
}

// ── SLIDE 8: COMPETITIVE ──────────────────────────────────────────────────────

function Slide8Competitive() {
  return (
    <>
      <SlideContent>
        <Label>Ventaja Competitiva</Label>
        <Heading>Por qué <Accent>Clasy</Accent> gana</Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 940, width: "100%", marginTop: "1rem" }}>
        <GlassCard icon="🌊" title="Efecto de Red" delay={3}>Cada tutor y alumno que se suma hace la plataforma más valiosa para todos. Más oferta atrae más demanda, y viceversa. La red se defiende sola.</GlassCard>
        <GlassCard icon="🎯" title="Hiper-especialización Vertical" delay={4}>No hacemos "clases de matemáticas". Hacemos clases particulares del ramo Z en la universidad Y. Oferta segmentada de universidad a curso que nadie más tiene.</GlassCard>
        <GlassCard icon="⚙️" title="Arquitectura Escalable" delay={5}>Verticalmente especializada pero con una arquitectura diseñada para escalar. El mismo motor replica el modelo en cualquier universidad, facultad o país.</GlassCard>
      </div>
      <HighlightBox delay={6}>
        <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.8)" }}>
          <strong style={{ color: "var(--cyan)" }}>Moat:</strong>&nbsp; Efecto de red + datos de rendimiento académico + oferta hiper-segmentada por universidad y ramo = barrera de entrada creciente con cada sesión agendada.
        </p>
      </HighlightBox>
    </>
  );
}

// ── SLIDE 9: TEAM ─────────────────────────────────────────────────────────────

function Slide9Team() {
  const team = [
    { initial: "M", name: "Mati", role: "CTO · Co-founder · UC", desc: "Co-creador de Clasy. Ingeniero UC que hacía clases particulares y vivió el problema en carne propia. Lidera la arquitectura cloud-native en AWS." },
    { initial: "L", name: "Lucas", role: "Eng. Lead · Co-founder · UC", desc: "Co-creador de Clasy. Ingeniero UC y ex-tutor. A diferencia de muchos equipos dev, Mati y Lucas entienden el problema porque lo vivieron como profesores." },
    { initial: "A", name: "Adrián", role: "Growth & Redes", desc: "Creador de Alianza Emprende Chile, una de las redes de emprendimiento universitario más grandes de LATAM. Infinitos contactos en redes estudiantiles. Emprendedor y líder de producto en startups." },
    { initial: "S", name: "Seba", role: "Strategy & Inversiones", desc: "Emprendedor, inversor y asesor estratégico. Visión de negocio, red de contactos clave y experiencia en levantamiento de capital." },
  ];
  return (
    <>
      <SlideContent>
        <Label>Equipo</Label>
        <Heading>Founders que <Accent>vivieron el problema</Accent></Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: ".9rem", maxWidth: 1000, width: "100%", marginTop: "1.2rem" }}>
        {team.map((m, i) => (
          <div key={m.name} className={cx("glass-card", anim(i + 3))} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: "1.3rem .9rem", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Prompt, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 auto .7rem", boxShadow: "0 4px 16px rgba(26,196,252,.25)" }}>
              {m.initial}
            </div>
            <p style={{ fontFamily: "Prompt, sans-serif", fontSize: ".88rem", fontWeight: 600, marginBottom: ".2rem", color: "var(--white)" }}>{m.name}</p>
            <p style={{ fontSize: ".72rem", color: "var(--cyan)", marginBottom: ".35rem", fontWeight: 500 }}>{m.role}</p>
            <p style={{ fontSize: ".73rem", color: "var(--muted)", lineHeight: 1.5 }}>{m.desc}</p>
          </div>
        ))}
      </div>
      <HighlightBox delay={7}>
        <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.7)" }}>
          <strong style={{ color: "var(--cyan)" }}>Founder-problem fit:</strong>&nbsp; Mati y Lucas crearon Clasy porque hacían clases y vivían la fricción del mercado informal. Adrián trae la red de contactos universitarios más grande del país para ejecutar las atomic networks.
        </p>
      </HighlightBox>
    </>
  );
}

// ── SLIDE 10: NEXT STEPS ──────────────────────────────────────────────────────

function Slide10Next() {
  const steps = [
    { q: "Q1", title: "10 redes atómicas universitarias este semestre", desc: "Establecernos en 10 universidades con liquidez demostrable: tutores verificados cubriendo los ramos filtro clave de cada una." },
    { q: "Q1", title: "Nuevas features de conexión estudiantil", desc: "Features de hook y engagement ya en cola de desarrollo para fortalecer la retención y la conexión dentro del estudiantado." },
    { q: "Q2", title: "Expansión a preuniversitario", desc: "Llevar el modelo probado al mercado de preparación universitaria a medio semestre. Mismo playbook, nuevo segmento masivo con alta urgencia." },
    { q: "Q3", title: "Levantamiento de capital y crecimiento nacional", desc: "Con tracción demostrada en múltiples redes, iniciar ronda Pre-Seed para acelerar expansión a todo Chile y más verticales." },
  ];
  return (
    <>
      <SlideContent>
        <Label>Roadmap</Label>
        <Heading>Lo que viene para <Accent>Clasy</Accent></Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", maxWidth: 720, width: "100%", marginTop: "1rem" }}>
        {steps.map((s, i) => (
          <div key={i} className={cx("glass-card", anim(i + 3))} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 13, padding: ".9rem 1.2rem" }}>
            <div style={{ minWidth: 36, height: 26, borderRadius: 8, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Prompt, sans-serif", fontSize: ".65rem", fontWeight: 700, flexShrink: 0, boxShadow: "0 2px 12px rgba(26,196,252,.2)" }}>
              {s.q}
            </div>
            <div>
              <h4 style={{ fontFamily: "Prompt, sans-serif", fontSize: ".88rem", fontWeight: 600, color: "var(--white)", marginBottom: ".15rem" }}>{s.title}</h4>
              <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={anim(7)} style={{ marginTop: "1.4rem", textAlign: "center" }}>
        <CoverPill>clasy.cl · contacto@clasy.cl</CoverPill>
      </div>
    </>
  );
}

// ── Slide wrapper ─────────────────────────────────────────────────────────────

type SlideState = "active" | "exit-left" | "exit-right" | "hidden";

function Slide({ children, state }: { children: ReactNode; state: SlideState }) {
  const isActive = state === "active";
  return (
    <section
      className={cx("slide-section", isActive && "is-active")}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 6vw",
        transition: "opacity .5s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.4,0,.2,1)",
        willChange: "opacity, transform",
        pointerEvents: isActive ? "all" : "none",
        opacity: isActive ? 1 : 0,
        transform:
          isActive ? "translateX(0)"
            : state === "exit-left" ? "translateX(-50px)"
              : state === "exit-right" ? "translateX(50px)"
                : "translateX(40px)",
      }}
    >
      {children}
    </section>
  );
}

// ── Nav arrow ─────────────────────────────────────────────────────────────────

function NavBtn({ direction, onClick, disabled }: { direction: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  const pos: CSSProperties = direction === "prev" ? { left: "1.2rem" } : { right: "1.2rem" };
  return (
    <button
      className="nav-arrow"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      style={{
        position: "fixed", top: "50%", transform: "translateY(-50%)", ...pos,
        width: 46, height: 46, borderRadius: "50%",
        background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        zIndex: 9999, color: "rgba(255,255,255,.5)",
        opacity: disabled ? 0.2 : 1,
        transition: "all .25s",
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        {direction === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const SLIDES = [Slide1Cover, Slide2Problem, Slide3Solution, Slide4Product, Slide5Market, Slide6GTM, Slide7Business, Slide8Competitive, Slide9Team, Slide10Next];
const TOTAL = SLIDES.length;

export default function Deck() {
  const [current, setCurrent] = useState(0);
  const lock = useRef(false);
  const [states, setStates] = useState<SlideState[]>(SLIDES.map((_, i) => (i === 0 ? "active" : "hidden")));

  const goTo = useCallback((idx: number) => {
    if (lock.current || idx === current || idx < 0 || idx >= TOTAL) return;
    lock.current = true;
    const fwd = idx > current;

    setStates(prev => {
      const s: SlideState[] = prev.map(() => "hidden");
      s[current] = fwd ? "exit-left" : "exit-right";
      return s;
    });

    setTimeout(() => {
      setStates(() => {
        const s: SlideState[] = SLIDES.map(() => "hidden");
        s[idx] = "active";
        return s;
      });
      setCurrent(idx);
      lock.current = false;
    }, 280);
  }, [current]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev]);

  useEffect(() => {
    let x = 0;
    const s = (e: TouchEvent) => { x = e.touches[0].clientX; };
    const e = (ev: TouchEvent) => { const d = x - ev.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? next() : prev(); };
    window.addEventListener("touchstart", s, { passive: true });
    window.addEventListener("touchend", e, { passive: true });
    return () => { window.removeEventListener("touchstart", s); window.removeEventListener("touchend", e); };
  }, [next, prev]);

  const pct = ((current + 1) / TOTAL) * 100;

  return (
    <>
      {/* Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, background: "var(--grad)", borderRadius: "0 99px 99px 0", transition: "width .4s cubic-bezier(.4,0,.2,1)", zIndex: 200, width: `${pct}%`, boxShadow: "0 0 12px rgba(26,196,252,.4)" }} />

      {/* Watermark */}
      <div style={{ position: "fixed", top: "1.2rem", left: "1.6rem", display: "flex", alignItems: "center", gap: ".6rem", zIndex: 100, opacity: 0.6 }}>
        <img src="/logo.png" alt="Clasy" style={{ width: 26, height: "auto" }} />
        <span style={{ fontFamily: "Prompt, sans-serif", fontSize: ".85rem", fontWeight: 700, background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Clasy</span>
      </div>

      {/* Counter */}
      <div style={{ position: "fixed", top: "1.4rem", right: "1.6rem", fontSize: ".7rem", color: "rgba(255,255,255,.25)", fontFamily: "Work Sans, sans-serif", zIndex: 100 }}>
        <strong style={{ color: "rgba(255,255,255,.5)" }}>{current + 1}</strong>
        <span style={{ margin: "0 .2rem" }}>/</span>{TOTAL}
      </div>

      {/* Slides */}
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", zIndex: 1 }}>
        {SLIDES.map((C, i) => <Slide key={i} state={states[i]}><C /></Slide>)}
      </div>

      {/* Arrows */}
      <NavBtn direction="prev" onClick={prev} disabled={current === 0} />
      <NavBtn direction="next" onClick={next} disabled={current === TOTAL - 1} />

      {/* Dots */}
      <div style={{ position: "fixed", bottom: "1.6rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: ".4rem", zIndex: 9999 }}>
        {SLIDES.map((_, i) => (
          <button key={i} className="dot-btn" onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === current ? 24 : 6, height: 6, borderRadius: 99, background: i === current ? "var(--cyan)" : "rgba(255,255,255,.15)", border: "none", cursor: "pointer", padding: 0, boxShadow: i === current ? "0 0 10px rgba(26,196,252,.4)" : "none" }} />
        ))}
      </div>

      {/* Hint */}
      <div style={{ position: "fixed", bottom: "1.6rem", right: "1.6rem", fontSize: ".65rem", color: "rgba(255,255,255,.18)", letterSpacing: ".06em", zIndex: 100 }}>← → navegar</div>
    </>
  );
}
