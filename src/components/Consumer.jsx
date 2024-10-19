import React from 'react'

const Consumer = () => {
  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


              <div class="card">
                <h5 class="card-header">Welcome to consumer..</h5>
                <div class="card-body">
                  <h3 class="card-title text-uppercase text-primary fw-bold">Search for Donors</h3>
                  <p class="card-text text-muted fs-5">
                    Easily find available donors based on blood type. Ensure timely assistance and support for your needs.
                  </p>
                  <a href="/searchdonar" class="btn btn-primary">Search Donars</a><br></br><br></br>
                  <a href="/requestblood" class="btn btn-primary">Request Blood</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Consumer