const FooterDesktop = () => {
  return (
    <>
      <div className="container bg-white d-none d-md-block">
        <footer className="fixed-bottom text-white text-right p-2">
          <figure className="text-end">
            <blockquote className="blockquote">
              <p>Aplikasi Pembaca Pikiran~</p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Thank you for coming, don${`'`}t forget to follow @kikukeii
              /@kikukeii_ ~
              <cite title="Source Title">
                <a
                  href="http://github.com/kikukeii"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Miftakhuddin Falaki
                </a>
              </cite>
            </figcaption>
          </figure>
        </footer>
      </div>
    </>
  );
};

export default FooterDesktop;
