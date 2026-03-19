import { Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import Barcode from 'react-barcode'

export default function EtiquetaModal({ show, onHide, detalle, produccion, op }) {
  const printRef = useRef()

  if (!detalle || !produccion || !op) return null

  const barcodeValue = `${op.id}-${String(detalle.numero_rollo).padStart(3, '0')}-${produccion.lote}`

  const handlePrint = () => {
    const contenido = printRef.current.innerHTML
    const ventana = window.open('', '_blank', 'width=500,height=450')
    ventana.document.write('<html><head><title>Etiqueta</title><style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; } .etiqueta { width: 264px; height: 378px; border: 2px solid black; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; } svg { max-width: 100%; }</style></head><body>' + contenido + '</body></html>')
    ventana.document.close()
    ventana.focus()
    setTimeout(() => { ventana.print(); ventana.close() }, 500)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-tag me-2"></i>
          Etiqueta — Rollo #{String(detalle.numero_rollo).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center py-4">
        <div ref={printRef}>
          <div className="etiqueta" style={{ width: 264, height: 378, border: '2px solid black', padding: 10, textAlign: 'center', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>

            <div style={{ borderBottom: '1px solid black', paddingBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 2 }}>COMERCIAL FRYS</div>
            </div>

            <div style={{ fontSize: 11, color: '#555' }}>
              {produccion.fecha} — Turno {produccion.turno}
            </div>

            <div style={{ fontSize: 13, fontWeight: 'bold' }}>
              LOTE: {produccion.lote}
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#555' }}>N° ROLLO</div>
              <div style={{ fontSize: 38, fontWeight: 'bold', lineHeight: 1 }}>
                {String(detalle.numero_rollo).padStart(3, '0')}
              </div>
            </div>

            <div style={{ fontSize: 12 }}>{op.producto?.nombre}</div>

            <div style={{ fontSize: 14, fontWeight: 'bold' }}>
              {op.ancho} mm × {op.espesor} mm
            </div>

            <div style={{ fontSize: 11, color: '#555' }}>
              Densidad: {op.densidad} | Color: {op.color?.nombre}
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#555' }}>PESO</div>
              <div style={{ fontSize: 30, fontWeight: 'bold', lineHeight: 1 }}>
                {detalle.kg} KG
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Barcode value={barcodeValue} width={1.2} height={35} fontSize={9} margin={0} />
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