const ojsPattern = /http.*(\/journals)(.*)/;
const ompPattern = /http.*(\/books)(.*)/;

let relativePath = '';
let match = window.location.href.match(ojsPattern);
const ojsPathsWithGradientHeader = ['', '/', '/index/login'];
if (match !== null && match.length > 1) relativePath = match[1];
else {
    match = window.location.href.match(ompPattern);
    if (match !== null && match.length > 1) relativePath = match[1];
}
const omp = relativePath === '/books';



function attachHeaderClass() {
    if (
        omp ||
        (match !== null &&
            match.length === 3 &&
            ojsPathsWithGradientHeader.includes(match[2]))
    ) {
        document
            .getElementById('headerNavigationContainer')
            .classList.add('idai-world-header');
    }
}

function enrichHeader() {
    fetch(relativePath + '/plugins/themes/publicationstheme/js/idai-world-header.html')
        .then(response => response.text())
        .then(text => {
            const navigationUserElement = document.getElementById('navigationUser');

            const idaiWorldNavDropdown = document.createElement('li');
            idaiWorldNavDropdown.id = 'idai-world-dropdown';
            idaiWorldNavDropdown.class = 'dropdown-menu';
            idaiWorldNavDropdown.innerHTML = text;

            const iDAIpublicationsLogo = document.createElement('img');
            iDAIpublicationsLogo.id = 'idai-publications-logo';
            iDAIpublicationsLogo.src =
                'https://publications.alayen.edu.iq/js/auiq_logo.webp';

            idaiWorldNavDropdown.appendChild(iDAIpublicationsLogo);
            navigationUserElement.appendChild(idaiWorldNavDropdown);

            document.getElementById('idai-publications-logo').src =
                 'https://publications.alayen.edu.iq/js/auiq_logo.webp';

            /* add Alayen-Logo to pkp_site_name-Header
            * --------------------------------------*/
            const pkpSiteNameHeader = document.getElementsByClassName('pkp_site_name');

            const DaiLogo = document.createElement('a');
            DaiLogo.id = "dai-logo"
            DaiLogo.href = "https://alayen.edu.iq/";

            const DaiLogoImage = document.createElement('img');
            DaiLogoImage.id = 'dai-logo-img';
            DaiLogoImage.src =
                 'https://publications.alayen.edu.iq/js/logo_top.png';

            DaiLogo.appendChild(DaiLogoImage);
            pkpSiteNameHeader[0].appendChild(DaiLogo);
        });
}

function attachFooter() {
    fetch(relativePath + '/plugins/themes/publicationstheme/js/idai-world-footer.html')
        .then(response => response.text())
        .then(text => {
            const pkpStructurePage = document.getElementsByClassName('pkp_structure_page');

            const idaiWorldFooter = document.createElement('footer');
            idaiWorldFooter.id = 'idai-world-footer';

            const footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            footerContainer.innerHTML = "" +
                "<p>" +
                "<span id=\"contact\">Contact: " +
                "       <a href=\"mailto:admin@alayen.edu.iq\">admin@alayen.edu.iq</a>" +
                "</span>" +
                "</p>";

            const footerAdditionalRow = document.createElement('div');
            footerAdditionalRow.id = 'footer-additional-row';
            footerAdditionalRow.innerHTML = "" +
                "<p>" +
                "<span class=\"slogan\">AUIQ Academic Press is a service of Alayen University.</span>" +
                "<span class=\"links\">" +
                "   <a href=\"https://publications.alayen.edu.iq/journals/index.php/index/data-protection\" target=\"_blank\">Data Protection Regulation</a>" +
                "</span>" +
                "<span class=\"links\">" +
                "   <a href=\"https://publications.alayen.edu.iq/journals/index.php/index/terms-of-use\" target=\"_blank\">Legal notice</a>" +
                "</span>" +
                "<span>" +
                "   <a href=\"https://pkp.sfu.ca\" target=\"_blank\">" +
                "   About Publishing System</a>" +
                "<span>" +
                "<p>";

            const footerLogo = document.createElement('img');
            footerLogo.id = 'idai-footer-logo';
            footerLogo.src =
                 'https://publications.alayen.edu.iq/js/auiq_footer.webp';

            idaiWorldFooter.appendChild(footerContainer);
            idaiWorldFooter.appendChild(footerAdditionalRow);
            footerContainer.appendChild(footerLogo);
            pkpStructurePage[0].appendChild(idaiWorldFooter);

        });
}

/** attach "has_site_logo" class to body by default:
 * ---------------------------------------------------
 *  .has_site_logo is defined in default-theme
 *  attaching it to the body-element simplifies some style issues for pages,
 which have no text-logo-img (e.g. journal and books index page and certain journals)
 * ---------------------------------------------------
 **/

function attachSiteLogoClassToBody() {
    document.body.classList.add('has_site_logo');
}

attachSiteLogoClassToBody();
attachHeaderClass();
attachFooter();
enrichHeader();




