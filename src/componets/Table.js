const Table = ({list, editar, estadoEdit}) => {
    return (
        <>
            <table className="table table-dark table-striped">
                <thead key="thead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Auditor</th>
                        <th scope="col">ente_control</th>
                        <th scope="col">estado</th>
                        <th scope="col">fecha_inicio</th>
                        <th scope="col">fecha_fin</th>
                        <th scope="col">acciones</th>
                    </tr>
                </thead>
                <tbody key="tbody">
                {
                    list.map((item, index) =>
                        <tr>
                            <th scope="row">{++index}</th>
                            <td>{item.auditor}</td>
                            <td>{item.ente_control}</td>
                            <td>{item.estado==0 ? 'Iniciado': 'Finalizado'}</td>
                            <td>{item.fecha_inicio}</td>
                            <td>{item.fecha_fin}</td>
                            <td>
                                <button className="btn btn-primary" onClick={editar(item.id)}>
                                    <i className="bi bi-pen"></i>
                                </button>| 
                                <button className="btn btn-warning" disabled={item.estado==1} onClick={estadoEdit(item)}> 
                                    <i className="bi bi-check-all"></i>
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </>
    )

}

export default Table;