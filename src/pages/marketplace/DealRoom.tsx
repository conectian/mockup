import { useParams } from 'react-router-dom';

export default function DealRoom() {
    const { id } = useParams();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Deal Room</h1>
            <p>Project Details for ID: {id}</p>
        </div>
    );
}
