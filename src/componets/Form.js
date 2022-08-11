
const Form = ({auditoria, setAuditoria, guardar})=>{

    const handleChange= (e) => {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        setAuditoria(values => ({...values, [name]: value}))
    }
    return (
        <>
            <form className="row g-3" onSubmit={guardar(auditoria)}>
                <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">Auditor</label>
                    <input type="text" className="form-control" id="auditor" name="auditor" value={auditoria.auditor || ""} onChange={handleChange}/>
                </div>
                <div className="col-6">
                    <label htmlFor="inputAddress2" className="form-label">Ente de control</label>
                    <input type="text" className="form-control" id="ente_control" name="ente_control" value={auditoria.ente_control || ""} onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" >Guardar</button>
                </div>
                
            </form>
            
        </>
    )
}

export default Form