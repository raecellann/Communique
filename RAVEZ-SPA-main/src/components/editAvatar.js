import cssLoader from "../utility/cssLoader";

export default async function EditAvatar(root) {  
    console.log(localStorage.getItem('account_id'));

    root.innerHTML = `
        <main id="main">
            <div class="page-title">
                <h1>PROFILE</h1>
            </div>
            <div class="logo">
                <a href="/">
                  <img src="../FavLogo.ico" alt="Website Logo" class="logo">
                </a>
            </div>

            <div class="profile-container">
                <div class="photo-container">
                    <div class="change-photo">
                      <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="yeshel-profile" id="user-image">
                    </div>
                    <div class="button-container">
                        <button class="change-photo-btn">Change Photo</button> 
                        <button class="set-btn"> Set</button>
                        <button class="cancel-btn">Cancel</button> 
                    </div>
                </div>
                <div class="selection-avatar">
                    <div class="men-selection">Men Selection</div>
                    <div class="men-avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717016/Ellipse_6_siocie.png" alt="Men 1" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717016/Ellipse_7_eoqshc.png" alt="Men 2" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717016/Ellipse_8_qfllsd.png" alt="Men 3" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717017/Ellipse_9_1_stm2wh.png" alt="Men 4" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717017/Ellipse_10_bq4dvf.png" alt="Men 5" class="avatar">
                    </div>
                    <div class="women-selection">Women Selection</div>
                    <div class="women-avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717043/Ellipse_6_fuvewm.png" alt="Women 1" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717043/Ellipse_7_zy6irq.png" alt="Women 2" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717043/Ellipse_8_o3tpvj.png" alt="Women 3" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717043/Ellipse_9_1_gtrmbi.png" alt="Women 4" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717043/Ellipse_10_fia2mc.png" alt="Women 5" class="avatar">
                    </div>
                    <div class="other-selection">Other Selection</div>
                    <div class="other-avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717062/Ellipse_6_coe8bf.png" alt="Other 1" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717062/Ellipse_7_hzdjdp.png" alt="Other 2" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717062/Ellipse_9_1_egk3cg.png" alt="Other 3" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717062/Ellipse_8_dekvo7.png" alt="Other 4" class="avatar">
                        <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1731717062/Ellipse_10_fkvcqr.png" alt="Other 5" class="avatar">
                    </div>
                </div>
            </div>      
        </main>
    `;
}