import './Revision.css'
import ModalQ from '../Components/ModalQ'
function Revision({ dataQuestion, setDataQuestion }) {
  return (
    <div>
      <h2>Raffraichir ces fondamentaux</h2>
      <ModalQ dataQuestion={dataQuestion} setDataQuestion={setDataQuestion} />
    </div>
  )
}

export default Revision
