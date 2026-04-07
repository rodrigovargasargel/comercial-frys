import { Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function EtiquetaSelladoraModal({ show, onHide, detalle, produccion, op }) {
  const printRef = useRef()

  if (!detalle || !produccion || !op) return null

      const densidad = detalle.densidad_extrusora === 'alta' ? 'A/D' : detalle.densidad_extrusora === 'baja' ? 'B/D' : '—'

    const fechaElaboracion = detalle.fecha_extrusora
      ? detalle.fecha_extrusora.split('-').reverse().join('-')
      : ''

    const fechaVencimiento = (() => {
      if (!detalle.fecha_extrusora) return ''
      const d = new Date(detalle.fecha_extrusora)
      d.setFullYear(d.getFullYear() + 1)
      return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`
    })()

  const qrData = JSON.stringify({
  empresa: "Comercial Frys Ltda." , 
  producto: op.producto?.nombre,
  color: op.color?.nombre,
  densidad: detalle.densidad_extrusora,
  ancho: op.ancho,
  largo: op.largo,
  espesor: op.espesor,
  unidades: detalle.q_unidades_por_paquete,
  lote: detalle.lote_extrusora,
  fecha: fechaElaboracion
})

  const handlePrint = () => {
    const contenido = printRef.current.innerHTML
    const ventana = window.open('', '_blank', 'width=600,height=400')
    ventana.document.write(`<html><head><title>Etiqueta Paquete</title><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @page { margin: 0mm; size: 10cm 7cm landscape; }
      html, body { width: 10cm; height: 7cm; font-family: Arial, sans-serif; background: white; }
      .etiqueta { width: 10cm; height: 7cm; border: 2px solid black; padding: 6px; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto; gap: 4px; overflow: hidden; }
      svg { max-width: 100%; }
    </style></head><body>${contenido}</body></html>`)
    ventana.document.close()
    ventana.focus()
    setTimeout(() => { ventana.print(); ventana.close() }, 500)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-tag me-2"></i>
          Etiqueta Paquete — {op.producto?.nombre}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center py-4">
        <div ref={printRef}>
          <div style={{
            width: '10cm', height: '7cm', border: '2px solid black',
            padding: 8, fontFamily: 'Arial, sans-serif',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 6, overflow: 'hidden', margin: 0
          }}>

            {/* Columna izquierda */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

              
              {/* Cabecera */}
                <div style={{ borderBottom: '1px solid black', paddingBottom: 4, marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }}>
                    COMERCIAL FRYS LTDA
                </div>
                <div style={{ fontSize: 10, color: '#444' }}>www.comercialfrys.cl</div>
                <div style={{ fontSize: 10, color: '#444' }}>Cel: +569 96797817 | rmolina@comercialfrys.cl</div>
                </div>

                {/* Producto */}
                <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 2 }}>
                {op.producto?.nombre} {op.color?.nombre} {densidad}
                </div>

                {/* Medidas */}
                <div style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 2 }}>
                {op.ancho} cm × {op.largo} cm × {op.espesor} mcr
                </div>

                {/* Unidades */}
                {/* Unidades y Kilos */}
                <div style={{ textAlign: 'center' }}>
                 
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 16 }}>
                    <div style={{ fontSize: 34, fontWeight: 'bold', lineHeight: 1 }}>
                      {detalle.q_unidades_por_paquete} <span style={{ fontSize: 14, fontWeight: 'normal' }}>unid. /</span>
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 'bold', lineHeight: 1 }}>
                      {detalle.kilos} <span style={{ fontSize: 14, fontWeight: 'normal' }}>kg</span>
                    </div>
                  </div>
                </div>

                {/* Pie */}
                <div style={{ borderTop: '1px solid black', paddingTop: 4, fontSize: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>Elab:</strong> {fechaElaboracion}</span>
                    <span><strong>Vence:</strong> {fechaVencimiento}</span>
                </div>
                <div style={{ marginTop: 2 }}>
                <strong>Lote:</strong> {detalle.lote_extrusora || produccion.lote}
                </div>
                </div>
             

             

              

          

            </div>

            {/* Columna derecha: QR */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 6 }}>
              <QRCodeSVG value={qrData} size={90} />
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-1"></i> Cerrar
        </Button>
        <Button variant="dark" onClick={handlePrint}>
          <i className="fas fa-print me-2"></i> Imprimir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}