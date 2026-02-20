import { useState, useEffect, useCallback, type ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SlideProps {
  children: ReactNode;
  state: "active" | "exit-left" | "hidden";
  style?: React.CSSProperties;
}

// ── Slide wrapper ─────────────────────────────────────────────────────────────

function Slide({ children, state, style }: SlideProps) {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 6vw",
    transition: "opacity .55s cubic-bezier(.4,0,.2,1), transform .55s cubic-bezier(.4,0,.2,1)",
    willChange: "opacity, transform",
    pointerEvents: state === "active" ? "all" : "none",
    opacity: state === "active" ? 1 : 0,
    transform:
      state === "active"
        ? "translateX(0)"
        : state === "exit-left"
        ? "translateX(-60px)"
        : "translateX(60px)",
    ...style,
  };
  return <section style={base}>{children}</section>;
}

// ── Shared slide components ───────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Work Sans, sans-serif",
        fontSize: ".72rem",
        fontWeight: 600,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        color: "var(--cyan)",
        marginBottom: ".8rem",
      }}
    >
      {children}
    </p>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "Prompt, sans-serif",
        fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
        fontWeight: 700,
        lineHeight: 1.15,
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </h2>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "var(--grad)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 56,
        height: 3,
        background: "var(--grad)",
        borderRadius: 99,
        margin: "1rem auto 1.6rem",
      }}
    />
  );
}

function Card({
  icon,
  title,
  children,
  style,
}: {
  icon?: string;
  title?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 16,
        padding: "1.4rem 1.6rem",
        backdropFilter: "blur(12px)",
        transition: "border-color .25s, transform .25s",
        ...style,
      }}
    >
      {icon && (
        <span style={{ fontSize: "1.6rem", marginBottom: ".6rem", display: "block" }}>
          {icon}
        </span>
      )}
      {title && (
        <p
          style={{
            fontFamily: "Prompt, sans-serif",
            fontSize: ".95rem",
            fontWeight: 600,
            color: "var(--cyan)",
            marginBottom: ".4rem",
          }}
        >
          {title}
        </p>
      )}
      <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>
        {children}
      </p>
    </div>
  );
}

function ColBlock({
  title,
  children,
  borderColor,
}: {
  title: string;
  children: ReactNode;
  borderColor?: string;
}) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: `1px solid ${borderColor ?? "var(--card-border)"}`,
        borderRadius: 16,
        padding: "1.6rem",
      }}
    >
      <h3
        style={{
          fontFamily: "Prompt, sans-serif",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "var(--cyan)",
          marginBottom: ".8rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.72)", lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: ".3rem .85rem",
        borderRadius: 99,
        fontSize: ".75rem",
        fontWeight: 600,
        letterSpacing: ".06em",
        background: "linear-gradient(135deg,rgba(26,196,252,.18),rgba(28,113,243,.18))",
        border: "1px solid rgba(26,196,252,.3)",
        color: "var(--cyan)",
      }}
    >
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 12,
        padding: ".9rem 1.6rem",
        textAlign: "center",
        minWidth: 160,
      }}
    >
      <div
        style={{
          fontFamily: "Prompt, sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          background: "var(--grad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: ".2rem" }}>{label}</div>
    </div>
  );
}

function HighlightBox({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(26,196,252,.08), rgba(28,113,243,.08))",
        border: "1px solid rgba(26,196,252,.25)",
        borderRadius: 16,
        padding: "1.5rem 2rem",
        maxWidth: 820,
        marginTop: "1.2rem",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function SlideContent({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", maxWidth: 980, textAlign: "center" }}>{children}</div>
  );
}

// ── Individual slides ─────────────────────────────────────────────────────────

function CoverPill({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".5rem",
        padding: ".4rem 1rem",
        borderRadius: 99,
        border: "1px solid rgba(26,196,252,.3)",
        background: "rgba(26,196,252,.07)",
        fontSize: ".78rem",
        fontWeight: 500,
        color: "var(--cyan)",
        letterSpacing: ".08em",
        textTransform: "uppercase",
        marginBottom: "1.4rem",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          background: "var(--cyan)",
          borderRadius: "50%",
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function Slide1Cover() {
  return (
    <>
      <CoverPill>Investor Deck · 2025</CoverPill>
      <img
        src="/logo.png"
        alt="Clasy"
        style={{
          width: 72,
          height: "auto",
          marginBottom: "1.6rem",
          filter: "drop-shadow(0 0 24px rgba(26,196,252,.45))",
        }}
      />
      <div
        style={{
          fontFamily: "Prompt, sans-serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 800,
          lineHeight: 1,
          background: "var(--grad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-.01em",
        }}
      >
        Clasy
      </div>
      <p
        style={{
          fontFamily: "Work Sans, sans-serif",
          fontSize: "clamp(.95rem, 1.6vw, 1.2rem)",
          color: "var(--muted)",
          maxWidth: 600,
          textAlign: "center",
          lineHeight: 1.7,
          marginTop: "1rem",
        }}
      >
        Marketplace que profesionaliza las tutorías universitarias
        <br />
        mediante conexión verificada y contenido híbrido escalable.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1.2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2.2rem",
        }}
      >
        <Stat value="1.2M" label="Estudiantes en Chile" />
        <Stat value="B2B2C" label="Modelo de crecimiento" />
        <Stat value="AWS" label="Cloud-native · 100%" />
      </div>
    </>
  );
}

function Slide2Problem() {
  const problems = [
    {
      icon: "😰",
      title: "Alumnos contratan a ciegas",
      desc: "Se contactan por WhatsApp o Instagram sin garantía de calidad, arriesgando su rendimiento en ramos críticos.",
    },
    {
      icon: "⏳",
      title: "Tutores atrapados en lo operativo",
      desc: "Gestionan cobros, agendas y links manualmente en lugar de enseñar. Alta fricción = bajo volumen de clases.",
    },
    {
      icon: "🔗",
      title: "Oferta fragmentada y opaca",
      desc: "No existe estándar de calidad. Cualquiera se anuncia como tutor sin filtro académico ni verificación real.",
    },
    {
      icon: "💸",
      title: "Transacciones sin protección",
      desc: "Pagos en efectivo o transferencia directa. El alumno paga sin garantía de recibir el servicio contratado.",
    },
  ];
  return (
    <>
      <SlideContent>
        <Label>El Problema</Label>
        <Heading>
          El mercado de tutorías es <Accent>informal y riesgoso</Accent>
        </Heading>
        <Divider />
      </SlideContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.2rem",
          maxWidth: 940,
          width: "100%",
          marginTop: "1.4rem",
        }}
      >
        {problems.map((p) => (
          <div
            key={p.title}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: 16,
              padding: "1.6rem",
            }}
          >
            <span style={{ fontSize: "1.8rem", marginBottom: ".7rem", display: "block" }}>
              {p.icon}
            </span>
            <h3
              style={{
                fontFamily: "Prompt, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: ".45rem",
                color: "var(--white)",
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: ".87rem", color: "rgba(255,255,255,.65)", lineHeight: 1.65 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function Slide3Solution() {
  return (
    <>
      <SlideContent>
        <Label>La Solución</Label>
        <Heading>
          <Accent>Conexión verificada</Accent> + automatización total del flujo
        </Heading>
        <Divider />
      </SlideContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          maxWidth: 920,
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        <Card icon="✅" title="Filtro de Talento Estricto">
          Centralizamos la oferta y verificamos académicamente a cada tutor antes de habilitarlo en la plataforma.
        </Card>
        <Card icon="⚡" title="Flujo 100% Automatizado">
          Agendamiento, cobros y aula virtual en una sola plataforma. Cero fricción para alumnos y tutores.
        </Card>
        <Card icon="🔒" title="Seguridad Transaccional">
          Pagos custodiados, confirmación de sesión y sistema de reseñas. El alumno siempre está protegido.
        </Card>
      </div>
      <HighlightBox>
        <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.85)" }}>
          <strong style={{ color: "var(--cyan)" }}>Resultado:</strong>&nbsp; Los mejores tutores
          universitarios, al alcance de cualquier alumno, con la misma facilidad que pedir un
          delivery.
        </p>
      </HighlightBox>
    </>
  );
}

function Slide4Product() {
  return (
    <>
      <SlideContent>
        <Label>El Producto</Label>
        <Heading>
          Tres <Accent>modalidades</Accent> de aprendizaje
        </Heading>
        <Divider />
      </SlideContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.2rem",
          maxWidth: 960,
          width: "100%",
          marginTop: "1.2rem",
        }}
      >
        <ColBlock title="🎙️ Clases Particulares en Vivo">
          Tutorías 1 a 1 para resolución quirúrgica de dudas del ramo. El alumno elige modalidad online o presencial según su preferencia.
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>1 a 1</Badge> <Badge>Online</Badge> <Badge>Presencial</Badge>
          </div>
        </ColBlock>
        <ColBlock title="🎬 Contenido Grabado">
          Cápsulas de micro-learning, guías y material de estudio disponible 24/7. Mantienen la retención cuando no hay clases en vivo programadas.
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>Cápsulas</Badge> <Badge>Guías</Badge> <Badge>24/7</Badge>
          </div>
        </ColBlock>
        <ColBlock title="👥 Clases Masivas">
          El tutor publica un horario y múltiples alumnos se inscriben. Mayor accesibilidad para el estudiante, mayor alcance para el profesor.
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>Grupal</Badge> <Badge>Agenda Pública</Badge> <Badge>Escalable</Badge>
          </div>
        </ColBlock>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          maxWidth: 960,
          width: "100%",
          marginTop: "1.2rem",
        }}
      >
        {[
          { icon: "📅", title: "Agendamiento" },
          { icon: "💳", title: "Cobros Integrados" },
          { icon: "🖥️", title: "Aula Virtual" },
          { icon: "📚", title: "Material de Estudio" },
        ].map((c) => (
          <div
            key={c.title}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: 16,
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "1.3rem", display: "block", marginBottom: ".4rem" }}>
              {c.icon}
            </span>
            <p
              style={{
                fontFamily: "Prompt, sans-serif",
                fontSize: ".82rem",
                fontWeight: 600,
                color: "var(--cyan)",
              }}
            >
              {c.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function Slide5Market() {
  return (
    <>
      <SlideContent>
        <Label>Tamaño de Mercado</Label>
        <Heading>
          Una oportunidad <Accent>masiva y subatendida</Accent>
        </Heading>
        <Divider />
      </SlideContent>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          marginTop: "1.6rem",
        }}
      >
        {/* Concentric rings */}
        <div style={{ position: "relative", width: 240, height: 240 }}>
          {/* TAM */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(28,113,243,.4)",
              background: "rgba(28,113,243,.05)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <span style={{ fontFamily: "Prompt, sans-serif", fontSize: ".72rem", fontWeight: 700, color: "rgba(28,113,243,.9)", letterSpacing: ".05em" }}>TAM</span>
          </div>
          {/* SAM */}
          <div
            style={{
              position: "absolute",
              inset: "32px",
              borderRadius: "50%",
              border: "2px solid rgba(26,196,252,.5)",
              background: "rgba(26,196,252,.07)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: "10px",
            }}
          >
            <span style={{ fontFamily: "Prompt, sans-serif", fontSize: ".75rem", fontWeight: 700, color: "var(--cyan)" }}>SAM</span>
            <span style={{ fontSize: ".65rem", color: "rgba(255,255,255,.65)", marginTop: ".1rem", textAlign: "center", lineHeight: 1.3 }}>1.2M<br />Chile</span>
          </div>
          {/* SOM */}
          <div
            style={{
              position: "absolute",
              inset: "67px",
              borderRadius: "50%",
              border: "2px solid var(--cyan)",
              background: "rgba(26,196,252,.13)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "Prompt, sans-serif", fontSize: ".7rem", fontWeight: 700, color: "var(--cyan)" }}>SOM</span>
            <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.65)", textAlign: "center", lineHeight: 1.3 }}>STEM<br />SGO+VPO</span>
          </div>
        </div>

        {/* Descriptions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360 }}>
          {[
            { dot: "rgba(28,113,243,.8)", label: "TAM", text: "Mercado global de tutorías y EdTech en Latinoamérica. Segmento en aceleración post-pandemia." },
            { dot: "var(--cyan)", label: "SAM", text: "1.2 millones de estudiantes de educación superior en Chile que enfrentan ramos filtro cada semestre." },
            { dot: "#fff", label: "SOM", text: "Alumnos de carreras STEM en universidades de Santiago y Valparaíso. Nuestro beachhead inicial." },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: ".8rem", alignItems: "flex-start" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.dot, marginTop: ".3rem", flexShrink: 0 }} />
              <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--white)" }}>{item.label}</strong> — {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Slide6GTM() {
  return (
    <>
      <SlideContent>
        <Label>Go-To-Market y Tracción</Label>
        <Heading>
          Redes <Accent>Atómicas</Accent> + Alianzas B2B2C
        </Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: 940, width: "100%", marginTop: "1.2rem" }}>
        <ColBlock title="⚛️ Estrategia de Red Atómica" borderColor="rgba(26,196,252,.3)">
          Conquistamos de forma quirúrgica{" "}
          <strong style={{ color: "var(--white)" }}>1 Facultad + Ramos críticos</strong> a la vez.
          Probamos liquidez antes de escalar a la siguiente red.
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>1 Facultad</Badge> <Badge>Ramos Críticos</Badge> <Badge>Liquidez Primero</Badge>
          </div>
        </ColBlock>
        <ColBlock title="🤝 Modelo B2B2C" borderColor="rgba(28,113,243,.3)">
          Alianzas con{" "}
          <strong style={{ color: "var(--white)" }}>Centros de Estudiantes y Federaciones</strong>{" "}
          (ej: FEPUCV) para validación institucional y captación masiva a bajo costo.
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>FEPUCV</Badge> <Badge>FEUC</Badge> <Badge>CAc</Badge>
          </div>
        </ColBlock>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 940, width: "100%", marginTop: "1.2rem" }}>
        <Card icon="🎯" title="CAC reducido" style={{ textAlign: "center" }}>
          Validación institucional lleva el costo de adquisición al mínimo
        </Card>
        <Card icon="🌊" title="Efecto de red" style={{ textAlign: "center" }}>
          Más tutores → mejor oferta → más alumnos → más tutores
        </Card>
        <Card icon="📈" title="Playbook replicable" style={{ textAlign: "center" }}>
          Mismo modelo, mismo proceso en cada nueva facultad
        </Card>
      </div>
    </>
  );
}

function Slide7Business() {
  return (
    <>
      <SlideContent>
        <Label>Modelo de Negocios</Label>
        <Heading>
          <Accent>Service fee</Accent> sobre cada transacción
        </Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: 860, width: "100%", marginTop: "1.2rem" }}>
        <ColBlock title="🎙️ Clases en Vivo — 15% fee" borderColor="rgba(26,196,252,.35)">
          Los tutores publican su servicio y fijan su precio. Clasy cobra un 15% adicional al alumno sobre el precio del profesor por cada clase particular o masiva agendada y pagada en la plataforma.
          <div style={{ marginTop: "1.2rem", background: "rgba(26,196,252,.06)", borderRadius: 10, padding: ".8rem 1rem" }}>
            <p style={{ fontSize: ".85rem", color: "var(--cyan)", fontWeight: 600 }}>
              El tutor recibe el 100% de su precio · Clasy cobra al alumno
            </p>
          </div>
        </ColBlock>
        <ColBlock title="🎬 Contenido Grabado — 25% fee" borderColor="rgba(28,113,243,.35)">
          Los tutores publican cápsulas, guías y material de estudio. Clasy cobra un 25% sobre el precio del contenido. Mayor margen por la escalabilidad infinita del inventario digital.
          <div style={{ marginTop: "1.2rem", background: "rgba(28,113,243,.06)", borderRadius: 10, padding: ".8rem 1rem" }}>
            <p style={{ fontSize: ".85rem", color: "#7baeff", fontWeight: 600 }}>
              Inventario infinito · alto margen · disponible 24/7
            </p>
          </div>
        </ColBlock>
      </div>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.8rem" }}>
        <Stat value="15%" label="Fee en vivo" />
        <Stat value="25%" label="Fee grabado" />
        <Stat value="~0" label="Costo marginal" />
        <Stat value="∞" label="Escalabilidad" />
      </div>
    </>
  );
}

function Slide8Competitive() {
  return (
    <>
      <SlideContent>
        <Label>Ventaja Competitiva</Label>
        <Heading>
          Por qué <Accent>Clasy</Accent> gana
        </Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 940, width: "100%", marginTop: "1.5rem" }}>
        <Card icon="🌊" title="Efecto de Red">
          Cada tutor y alumno que se suma hace la plataforma más valiosa para todos. Más oferta atrae más demanda, y viceversa. La red se defiende sola.
        </Card>
        <Card icon="🎯" title="Hiper-especialización Vertical">
          No hacemos "clases de matemáticas". Hacemos clases particulares del ramo Z en la universidad Y. Oferta segmentada de universidad a curso que nadie más tiene.
        </Card>
        <Card icon="⚙️" title="Arquitectura Escalable">
          Verticalmente especializada pero con una arquitectura diseñada para escalar. El mismo motor replica el modelo en cualquier universidad, facultad o país.
        </Card>
      </div>
      <HighlightBox>
        <p style={{ fontSize: ".92rem", color: "rgba(255,255,255,.85)" }}>
          <strong style={{ color: "var(--cyan)" }}>Moat:</strong>&nbsp; Efecto de red + datos de rendimiento académico + oferta hiper-segmentada por universidad y ramo = barrera de entrada creciente con cada sesión agendada.
        </p>
      </HighlightBox>
    </>
  );
}

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
        <Heading>
          Founders que <Accent>vivieron el problema</Accent>
        </Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", maxWidth: 1000, width: "100%", marginTop: "1.4rem" }}>
        {team.map((m) => (
          <div key={m.name} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, padding: "1.4rem 1rem", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Prompt, sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: "0 auto .8rem" }}>
              {m.initial}
            </div>
            <p style={{ fontFamily: "Prompt, sans-serif", fontSize: ".9rem", fontWeight: 600, marginBottom: ".25rem", color: "var(--white)" }}>{m.name}</p>
            <p style={{ fontSize: ".78rem", color: "var(--cyan)", marginBottom: ".4rem" }}>{m.role}</p>
            <p style={{ fontSize: ".77rem", color: "var(--muted)", lineHeight: 1.5 }}>{m.desc}</p>
          </div>
        ))}
      </div>
      <HighlightBox>
        <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.75)" }}>
          <strong style={{ color: "var(--cyan)" }}>Founder-problem fit:</strong>&nbsp; Mati y Lucas crearon Clasy porque hacían clases y vivían la fricción del mercado informal. Adrián trae la red de contactos universitarios más grande del país para ejecutar las atomic networks.
        </p>
      </HighlightBox>
    </>
  );
}

function Slide10Next() {
  const steps = [
    { n: 1, title: "Saturar oferta de tutores — Red Atómica Piloto", desc: "Liquidez demostrable en la primera facultad: suficientes tutores verificados para cubrir cualquier ramo crítico en menos de 24h." },
    { n: 2, title: "Demostrar métricas de liquidez y retención", desc: "Tasa de agendamiento, NPS y retención entre sesiones. Proof of concept sólido para el levantamiento de capital." },
    { n: 3, title: "Levantamiento de capital — Pre-Seed", desc: "Capital para expandir el modelo a nuevas facultades y universidades en Santiago y Valparaíso." },
    { n: 4, title: "Expansión a nuevas redes atómicas", desc: "Replicar el playbook probado facultad por facultad. Crecimiento sistemático y predecible a nivel nacional." },
  ];
  return (
    <>
      <SlideContent>
        <Label>Próximos Pasos</Label>
        <Heading>
          El camino a <Accent>escala</Accent>
        </Heading>
        <Divider />
      </SlideContent>
      <div style={{ display: "flex", flexDirection: "column", gap: ".8rem", maxWidth: 760, width: "100%", marginTop: "1.4rem" }}>
        {steps.map((s) => (
          <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: "1rem 1.4rem" }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Prompt, sans-serif", fontSize: ".85rem", fontWeight: 700, flexShrink: 0 }}>
              {s.n}
            </div>
            <div>
              <h4 style={{ fontFamily: "Prompt, sans-serif", fontSize: ".92rem", fontWeight: 600, color: "var(--white)", marginBottom: ".2rem" }}>{s.title}</h4>
              <p style={{ fontSize: ".82rem", color: "var(--muted)" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.6rem", textAlign: "center" }}>
        <CoverPill>clasy.cl · contacto@clasy.cl</CoverPill>
      </div>
    </>
  );
}

// ── Navigation button ─────────────────────────────────────────────────────────

function NavBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const posStyle: React.CSSProperties =
    direction === "prev" ? { left: "1.5rem" } : { right: "1.5rem" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      style={{
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        ...posStyle,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        zIndex: 9999,
        color: "rgba(255,255,255,.7)",
        opacity: disabled ? 0.25 : 1,
        transition: "all .2s",
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={22}
        height={22}
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

// ── Main Deck component ───────────────────────────────────────────────────────

const SLIDE_CONTENTS = [
  <Slide1Cover />,
  <Slide2Problem />,
  <Slide3Solution />,
  <Slide4Product />,
  <Slide5Market />,
  <Slide6GTM />,
  <Slide7Business />,
  <Slide8Competitive />,
  <Slide9Team />,
  <Slide10Next />,
];

const TOTAL = SLIDE_CONTENTS.length;

export default function Deck() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slideStates, setSlideStates] = useState<Array<"active" | "exit-left" | "hidden">>(
    SLIDE_CONTENTS.map((_, i) => (i === 0 ? "active" : "hidden"))
  );

  const goTo = useCallback(
    (next: number) => {
      if (transitioning || next === current || next < 0 || next >= TOTAL) return;
      setTransitioning(true);

      setSlideStates((prev) => {
        const s = [...prev];
        s[current] = "exit-left";
        return s;
      });

      setTimeout(() => {
        setSlideStates((prev) => {
          const s = prev.map(() => "hidden" as const);
          s[next] = "active";
          return s;
        });
        setCurrent(next);
        setTransitioning(false);
      }, 300);
    },
    [current, transitioning]
  );

  const handleNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const handlePrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  // Swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [handleNext, handlePrev]);

  const progressWidth = ((current + 1) / TOTAL) * 100;

  return (
    <>
      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          background: "var(--grad)",
          borderRadius: "0 99px 99px 0",
          transition: "width .45s cubic-bezier(.4,0,.2,1)",
          zIndex: 200,
          width: `${progressWidth}%`,
        }}
      />

      {/* Logo watermark */}
      <div
        style={{
          position: "fixed",
          top: "1.4rem",
          left: "2rem",
          display: "flex",
          alignItems: "center",
          gap: ".7rem",
          zIndex: 100,
          opacity: 0.75,
        }}
      >
        <img src="/logo.png" alt="Clasy" style={{ width: 30, height: "auto" }} />
        <span
          style={{
            fontFamily: "Prompt, sans-serif",
            fontSize: ".95rem",
            fontWeight: 700,
            background: "var(--grad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Clasy
        </span>
      </div>

      {/* Slide number */}
      <div
        style={{
          position: "fixed",
          top: "1.6rem",
          right: "2rem",
          fontSize: ".75rem",
          color: "rgba(255,255,255,.3)",
          fontFamily: "Work Sans, sans-serif",
          zIndex: 100,
        }}
      >
        <strong style={{ color: "rgba(255,255,255,.6)" }}>{current + 1}</strong> / {TOTAL}
      </div>

      {/* Slides */}
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", zIndex: 1 }}>
        {SLIDE_CONTENTS.map((content, i) => (
          <Slide key={i} state={slideStates[i]}>
            {content}
          </Slide>
        ))}
      </div>

      {/* Navigation arrows */}
      <NavBtn direction="prev" onClick={handlePrev} disabled={current === 0} />
      <NavBtn direction="next" onClick={handleNext} disabled={current === TOTAL - 1} />

      {/* Dot navigator */}
      <div
        style={{
          position: "fixed",
          bottom: "1.8rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          zIndex: 9999,
        }}
      >
        {SLIDE_CONTENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
            style={{
              width: i === current ? 22 : 7,
              height: 7,
              borderRadius: 99,
              background: i === current ? "var(--cyan)" : "rgba(255,255,255,.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "background .3s, width .3s",
            }}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div
        style={{
          position: "fixed",
          bottom: "1.8rem",
          right: "2rem",
          fontSize: ".7rem",
          color: "rgba(255,255,255,.25)",
          letterSpacing: ".06em",
        }}
      >
        ← → navegar
      </div>
    </>
  );
}
