import Layout from "../components/Layout"


const Index = () => {
    return (
        <Layout>
            <h1 className="display-1">Display Heading 100px B</h1>
            <h1 className="h1">123 100 px  6.25</h1>
            <h2 className="h2">123  48 px  3</h2>
            <h3 className="h3">123  40 px  2.5</h3>
            <h4 className="h4">123  32 px  2</h4>
            <h5 className="h5">123  28 px  1.75</h5>
            <h6 className="h6">123  20 px  1.25</h6>
            <p className="fw-bold">Title 16px B</p>
            <p className="fw-bold">Subtitle 14px B</p>
            <p>Body 16px Ｒ</p>
            <p>Body2 14px R</p>
            <p className="fs-1">Tiny 12px Ｒ</p>
            <button className="btn btn-primary">button primary</button>
            <button className="btn btn-primary disalbed">button primary disable</button>
            <br />
            <button className="btn btn-secondary">button secondary</button>
            <button className="btn btn-secondary disalbed">button secondary disable</button>
            <br />
            <button className="btn ">button ghost</button>
            <button className="btn disabled">button ghost disable</button>
            <br />
            <button className="btn btn-link">button text</button>
            <button className="btn btn-link disabled">button text disable</button>
            <br />
            <input type="text" className="form-control" />
            <input type="text" className="form-control is-invalid" />
            <div className="invalid-feedback">
                錯誤提示訊息
            </div>
            <select className="form-select">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </Layout>
    )
}

export default Index