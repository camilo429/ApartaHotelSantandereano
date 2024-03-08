import React from 'react'

function TestimonioHuesped({ nombre, url, description }) {
    return (
        <div className="flex" style={{ width: "350px", height: "280px" }}>
            <div className="testimonial_slider" style={{ width: "100%", height: "100%", margin: "10px" }} >
                <div className=" testimonial_item">
                    <img className="rounded-circle" src={url} alt="Huesped Comentario" style={{ width: "30%", height: "30%", marginLeft: "30%" }} />
                    <div className="media-body">
                        <p>{description}</p>
                        <h4 className="sec_h4">{nombre}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonioHuesped;