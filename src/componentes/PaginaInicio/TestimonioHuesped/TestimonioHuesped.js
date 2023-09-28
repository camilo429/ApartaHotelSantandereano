import React from 'react'

function TestimonioHuesped({nombre, url, description}) {
    return (
        <div className="flex">
            <div
                className="testimonial_slider"
                style={{ width: "300px", height: "380px", margin: "10px" }}
            >
                <div className=" testimonial_item">
                    <img
                        className="rounded-circle"
                        src={url}
                        alt="Foto del huesped del cual nos da el comentario"
                        style={{ width: "120px", height: "120px" }}
                    />
                    <div className="media-body">
                        <p>{description}</p>
                        <a href="/Home">
                            <h4 className="sec_h4">{nombre}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonioHuesped;