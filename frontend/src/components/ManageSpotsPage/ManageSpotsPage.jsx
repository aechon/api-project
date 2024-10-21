import TileList from '../TileList/TileList.jsx'
import './ManageSpotsPage.css'

function ManageSpotsPage() {

  return (
    <>
      <h1 className='manageSpotsTitle'>Manage Your Spots</h1>
      <TileList user={true} />
    </>
  );
}

export default ManageSpotsPage;