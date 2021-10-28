import { useContext } from 'react';
import { Tab, Tabs, Row, Col, Nav } from 'react-bootstrap';

import WindowContext from '../context/window-context';

import { isLessThanMedium } from '../utils/window';

import QualifyingOfferReport from './QualifyingOfferReport';
import SalaryBreakdownReport from './SalaryBreakdownReport';

function ChartTabs() {
  const screenSize = useContext(WindowContext);

  return (
    <>
      {isLessThanMedium(screenSize)
        ? (
          <Tab.Container defaultActiveKey="qualifying-report">
            <Row className="tab-vertical-container mb-3">
              <Col>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="qualifying-report">Qualifying Offer Report</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="salary-report">Salary Breakdown Report</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Tab.Content>
              <Tab.Pane eventKey="qualifying-report">
                <QualifyingOfferReport />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="salary-report">
                <SalaryBreakdownReport />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        ) : (
          <Tabs defaultActiveKey="qualifying-report" id="chart-tab" className="mb-5">
            <Tab eventKey="qualifying-report" title="Qualifying Offer Report">
              <QualifyingOfferReport />
            </Tab>
            <Tab eventKey="salary-report" title="Salary Breakdown Report">
              <SalaryBreakdownReport />
            </Tab>
          </Tabs>
        )
      }  
    </>
  );
}

export default ChartTabs;