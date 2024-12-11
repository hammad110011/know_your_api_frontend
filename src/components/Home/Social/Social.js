import React from 'react';
import './Social.css'
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

export default function Social() {
    return (
        <section className="social">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 info-contact">
                        <p className="contact-title">
                            <span><FontAwesomeIcon icon={faPhoneAlt} /></span>
                            <a className="contact-link" href="tel:+923071222284">+923071222284</a>
                        </p>
                    </div>
                    <div className="col-lg-3 info-contact">
                        <p className="contact-title">
                            <span><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
                            <a className="contact-link" href="mailto:i201777@nu.edu.pk">i201777@nu.edu.pk</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
