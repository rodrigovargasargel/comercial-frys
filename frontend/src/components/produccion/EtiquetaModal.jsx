import { Modal, Button } from 'react-bootstrap'
import { QRCodeSVG } from 'qrcode.react'
import { useRef } from 'react'

export default function EtiquetaModal({ show, onHide, detalle, produccion, op }) {
  const printRef = useRef()

  if (!detalle || !produccion || !op) return null

  const qrData = JSON.stringify({
    lote: op.lote,
    rollo: detalle.numero_rollo,
    producto: detalle.producto.nombre,
    kg: detalle.kg,
    ancho: detalle.ancho,
    espesor: detalle.espesor,
    fecha: produccion.fecha,
    turno: produccion.turno
  })

  const handlePrint = () => {
    const contenido = printRef.current.innerHTML
    const ventana = window.open('', '_blank', 'width=400,height=500')
    ventana.document.write(`
      <html>
        <head>
          <title>Etiqueta Rollo #${detalle.numero_rollo}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
            .etiqueta { width: 320px; border: 2px solid black; padding: 16px; text-align: center; }
            .empresa { font-size: 13px; font-weight: bold; letter-spacing: 2px; border-bottom: 1px solid black; padding-bottom: 8px; margin-bottom: 8px; }
            .lote { font-size: 22px; font-weight: bold; margin-bottom: 4px; }
            .turno-fecha { font-size: 12px; color: #555; margin-bottom: 12px; }
            .rollo { font-size: 32px; font-weight: bold; margin-bottom: 4px; }
            .medidas { font-size: 16px; margin-bottom: 4px; }
            .kg { font-size: 28px; font-weight: bold; margin-bottom: 12px; }
            .qr-container { display: flex; justify-content: center; margin-top: 8px; }
            svg { width: 100px !important; height: 100px !important; }
          </style>
        </head>
        <body>${contenido}</body>
      </html>
    `)
    ventana.document.close()
    ventana.focus()
    setTimeout(() => { ventana.print(); ventana.close() }, 500)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-tag me-2"></i>
          Etiqueta — Rollo #{detalle.numero_rollo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center py-4">
        <div ref={printRef}>
          <div className="etiqueta" style={{
            width: 320,
            border: '2px solid black',
            padding: 16,
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            {/* Empresa */}
            <div style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 2, borderBottom: '1px solid black', paddingBottom: 8, marginBottom: 8 }}>
              COMERCIAL FRYS
            </div>

            {/* Lote */}
            <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 2 }}>
              LOTE: {op.lote}
            </div>

            {/* Fecha y Turno */}
            <div style={{ fontSize: 12, color: '#555', marginBottom: 12 }}>
              {produccion.fecha} — Turno {produccion.turno}
            </div>

            {/* N° Rollo */}
            <div style={{ fontSize: 13, color: '#555' }}>N° ROLLO</div>
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 4 }}>
              {String(detalle.numero_rollo).padStart(3, '0')}
            </div>

            {/* Producto */}
            <div style={{ fontSize: 13, marginBottom: 4 }}>
              {detalle.producto.nombre}
            </div>

            {/* Medidas */}
            <div style={{ fontSize: 16, marginBottom: 4 }}>
              {detalle.ancho} mm × {detalle.espesor} mm
            </div>

            {/* KG */}
            <div style={{ fontSize: 13, color: '#555' }}>PESO</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>
              {detalle.kg} KG
            </div>

            {/* QR */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <QRCodeSVG value={qrData} size={100} />
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