import React from 'react'

const Admin = () => {

  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


              <div class="card">
                <h5 class="card-header">Welcome to admin page..</h5>
                <div class="card-body">
                  <h3 class="card-title text-uppercase text-primary fw-bold">Donor Requests Management</h3>
                  <p class="card-text text-muted fs-5">
                    Easily manage all donor requests and approvals in this section. Ensure efficient processing and track the status of each request.
                  </p>
                  <a href="/approvedonationreq" class="btn btn-primary">Pending Donar Request</a><br></br><br></br>
                  <a href="/viewdonationreq" class="btn btn-primary">View Status</a>
                </div>
              </div><br></br>

              <div class="card">
                <h5 class="card-header">Welcome</h5>
                <div class="card-body">
                  <h3 class="card-title text-uppercase text-success fw-bold">Consumer Requests Management</h3>
                  <p class="card-text text-muted fs-5">
                    Easily manage all consumer requests and approvals in this section
                  </p>
                  <a href="/approvebloodreq" class="btn btn-primary">New Blood Request</a><br></br><br></br>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


export default Admin