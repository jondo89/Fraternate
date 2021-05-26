const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
 
//////////////////////////////////////////////////
////       TEST ALL STATIC HTML PAGES        //// 
////////////////////////////////////////////////

var siteIndex = [
  {
    "loc": "/"
  },
  {
    "loc": "/database/search"
  },
  {
    "loc": "/assemblies"
  },
  {
    "loc": "/shop"
  },
  {
    "loc": "/documentation"
  },
  {
    "loc": "/terms"
  },
  {
    "loc": "/components"
  },
  {
    "loc": "/database"
  },
  {
    "loc": "/Privacy"
  },
  {
    "loc": "/components/docs"
  },
  {
    "loc": "/shop/docs"
  },
  {
    "loc": "/tools"
  },
  {
    "loc": "/database/docs"
  },
  {
    "loc": "/users"
  },
  {
    "loc": "/organizations"
  },
  {
    "loc": "/sitemap"
  },
  {
    "loc": "/issues/view"
  },
  {
    "loc": "/privacy"
  },
  {
    "loc": "/contact"
  },
  {
    "loc": "/documentation/search"
  },
  {
    "loc": "/shop/search"
  },
  {
    "loc": "/forms/search"
  },
  {
    "loc": "/configuration/search"
  },
  {
    "loc": "/customization/search"
  },
  {
    "loc": "/components/search"
  },
  {
    "loc": "/shop/belt-cleaning-systems"
  },
  {
    "loc": "/shop/belt-illumination"
  },
  {
    "loc": "/shop/belt-safety-devices1"
  },
  {
    "loc": "/shop/belt-support-systems"
  },
  {
    "loc": "/shop/belt-tracking-systems"
  },
  {
    "loc": "/shop/belting-products"
  },
  {
    "loc": "/shop/cable-racks-products"
  },
  {
    "loc": "/shop/chutes"
  },
  {
    "loc": "/shop/dust-suppresion-systems"
  },
  {
    "loc": "/shop/fire-detection-and-suppression"
  },
  {
    "loc": "/shop/material-storage"
  },
  {
    "loc": "/shop/power-packs1"
  },
  {
    "loc": "/shop/take-up-assembly"
  },
  {
    "loc": "/shop/walkways"
  },
  {
    "loc": "/shop/ploughs"
  },
  {
    "loc": "/shop/stage-1-cleaner"
  },
  {
    "loc": "/shop/stage-2-cleaner"
  },
  {
    "loc": "/shop/flood-lights"
  },
  {
    "loc": "/shop/lighting-mounting"
  },
  {
    "loc": "/shop/audio-visual-alarms"
  },
  {
    "loc": "/shop/electronic-conventional-sounder"
  },
  {
    "loc": "/shop/belt-misalignment-detectors"
  },
  {
    "loc": "/shop/belt-misalignment"
  },
  {
    "loc": "/shop/belt-speed-sensor1"
  },
  {
    "loc": "/shop/belt-speed-sensor"
  },
  {
    "loc": "/shop/tachometer-relay"
  },
  {
    "loc": "/shop/belt-tear-detectors"
  },
  {
    "loc": "/shop/tear-detectors-mechanical"
  },
  {
    "loc": "/shop/belt-arrestors"
  },
  {
    "loc": "/shop/conveyor-guarding"
  },
  {
    "loc": "/shop/conveyor-primary-device"
  },
  {
    "loc": "/shop/conveyor-trip-switches"
  },
  {
    "loc": "/shop/5ddf920efc113706904cb0f8"
  },
  {
    "loc": "/shop/5a437ca27f653f539c65ba04"
  },
  {
    "loc": "/shop/head-end-control-unit"
  },
  {
    "loc": "/shop/multi-function-safety-devices"
  },
  {
    "loc": "/shop/multi-function-safety-device"
  },
  {
    "loc": "/shop/rip-detection"
  },
  {
    "loc": "/shop/5a5498a49728ec03888c264b"
  },
  {
    "loc": "/shop/cable-racks"
  },
  {
    "loc": "/shop/5bcf5ede6b1f164294a25db3"
  },
  {
    "loc": "/shop/belt-sealing-systems"
  },
  {
    "loc": "/shop/blocked-chute-probes1"
  },
  {
    "loc": "/shop/5a55f92c3229f04620885349"
  },
  {
    "loc": "/shop/5caddee7cf4cf1512808dc2d"
  },
  {
    "loc": "/shop/chute-flange-sealing"
  },
  {
    "loc": "/shop/5b82bcb7d66c227328cd0bce"
  },
  {
    "loc": "/shop/buffer-water-tank"
  },
  {
    "loc": "/shop/fire-extinguisher"
  },
  {
    "loc": "/shop/5ddfb92afc113706904cb109"
  },
  {
    "loc": "/shop/backstops"
  },
  {
    "loc": "/shop/brake-systems"
  },
  {
    "loc": "/shop/couplings"
  },
  {
    "loc": "/shop/flywheels"
  },
  {
    "loc": "/shop/induction-motors"
  },
  {
    "loc": "/shop/wheel-drive-units"
  },
  {
    "loc": "/shop/5e3fda1587e5c539b89e91b2"
  },
  {
    "loc": "/shop/counterweight-arrestors"
  },
  {
    "loc": "/shop/load-cell-units"
  },
  {
    "loc": "/shop/screw-take-ups"
  },
  {
    "loc": "/shop/screw-take-ups1"
  },
  {
    "loc": "/shop/sheeves"
  },
  {
    "loc": "/shop/load-cells-products"
  },
  {
    "loc": "/shop/5a53354c94a70b3af4f39a20"
  },
  {
    "loc": "/shop/5a5334b094a70b3af4f39a1e"
  },
  {
    "loc": "/shop/5a52feef94a70b3af4f399b6"
  },
  {
    "loc": "/shop/winch-arrangements"
  },
  {
    "loc": "/shop/wire-rope-products"
  },
  {
    "loc": "/shop/5a4e36b44b8df750305f0c6c"
  },
  {
    "loc": "/shop/handrails"
  },
  {
    "loc": "/documentation/assembly-page"
  },
  {
    "loc": "/shop/hinge-kits"
  },
  {
    "loc": "/documentation/components-page"
  },
  {
    "loc": "/documentation/configuration-page"
  },
  {
    "loc": "/documentation/database-page"
  },
  {
    "loc": "/documentation/forms-page"
  },
  {
    "loc": "/documentation/introduction"
  },
  {
    "loc": "/documentation/shop-page"
  },
  {
    "loc": "/components/assembly-structures"
  },
  {
    "loc": "/components/belt-safety-devices"
  },
  {
    "loc": "/components/conveyor-belting"
  },
  {
    "loc": "/components/conveyors-components"
  },
  {
    "loc": "/components/design-parameters"
  },
  {
    "loc": "/components/idler-components"
  },
  {
    "loc": "/components/power-packs11"
  },
  {
    "loc": "/components/products"
  },
  {
    "loc": "/components/structures"
  },
  {
    "loc": "/components/5e830c2dfb346d43b85250df"
  },
  {
    "loc": "/components/generic-conveyor"
  },
  {
    "loc": "/components/5b6f4bed41b8b4274c3bac9d"
  },
  {
    "loc": "/components/5aab484c6d6576006813ce4b"
  },
  {
    "loc": "/components/proposal"
  },
  {
    "loc": "/components/5a53427894a70b3af4f39a57"
  },
  {
    "loc": "/components/ply-belting"
  },
  {
    "loc": "/components/5d0efffb76b97b59107f541a"
  },
  {
    "loc": "/components/5a55ff0f3229f04620885351"
  },
  {
    "loc": "/components/belt-speed"
  },
  {
    "loc": "/components/5bb308e5e8e8092114aea6fa"
  },
  {
    "loc": "/components/conveyor-system"
  },
  {
    "loc": "/components/design-scenarios"
  },
  {
    "loc": "/components/5bb307d1e8e8092114aea6f9"
  },
  {
    "loc": "/components/5bb3079ee8e8092114aea6f8"
  },
  {
    "loc": "/components/5902fa49e39d634468d2b7a3"
  },
  {
    "loc": "/components/operations"
  },
  {
    "loc": "/components/5dc28931d8f9bc25f8db4049"
  },
  {
    "loc": "/components/5bcc5f966b1f164294a25d9f"
  },
  {
    "loc": "/components/5bb46735e8e8092114aea795"
  },
  {
    "loc": "/components/carry-idlers"
  },
  {
    "loc": "/components/5cfb384c7bfaf375a0543077"
  },
  {
    "loc": "/components/5cfb38ab7bfaf375a054307e"
  },
  {
    "loc": "/components/59044d82f588ab3c34e267b1"
  },
  {
    "loc": "/components/5cfb388b7bfaf375a054307c"
  },
  {
    "loc": "/components/5cfb37fb7bfaf375a0543071"
  },
  {
    "loc": "/components/5cfb38d27bfaf375a0543080"
  },
  {
    "loc": "/components/5cfb38c37bfaf375a054307f"
  },
  {
    "loc": "/components/5cfb38997bfaf375a054307d"
  },
  {
    "loc": "/components/troughing-3-roll"
  },
  {
    "loc": "/components/idler-rolls"
  },
  {
    "loc": "/components/idler-rolls1"
  },
  {
    "loc": "/components/idler-structure"
  },
  {
    "loc": "/components/5a5363c494a70b3af4f39ac8"
  },
  {
    "loc": "/components/5a5357ed94a70b3af4f39a7a"
  },
  {
    "loc": "/components/5a5357cf94a70b3af4f39a79"
  },
  {
    "loc": "/components/5a53582f94a70b3af4f39a7c"
  },
  {
    "loc": "/components/return-idlers"
  },
  {
    "loc": "/components/5cfb38137bfaf375a0543073"
  },
  {
    "loc": "/components/5cfb38e87bfaf375a0543081"
  },
  {
    "loc": "/components/5cfb391f7bfaf375a0543083"
  },
  {
    "loc": "/components/brake"
  },
  {
    "loc": "/components/fluid-couplings"
  },
  {
    "loc": "/components/gear-units"
  },
  {
    "loc": "/components/5aab4baa6d6576006813ce6b"
  },
  {
    "loc": "/components/5a5198fe4e84af45d0cdb082"
  },
  {
    "loc": "/components/tru-line-flange-coupling"
  },
  {
    "loc": "/components/wheel-drives"
  },
  {
    "loc": "/components/belt-cleaning-arrangements"
  },
  {
    "loc": "/components/drive-head"
  },
  {
    "loc": "/components/5a433bef0834ff4698ba2f8e"
  },
  {
    "loc": "/database/contracts"
  },
  {
    "loc": "/database/conveyor-chute-work"
  },
  {
    "loc": "/database/conveyor-belting1"
  },
  {
    "loc": "/database/conveyor-design"
  },
  {
    "loc": "/database/drawings"
  },
  {
    "loc": "/database/dust-suppresion"
  },
  {
    "loc": "/database/estimating"
  },
  {
    "loc": "/database/glossary-terms"
  },
  {
    "loc": "/database/general-items"
  },
  {
    "loc": "/database/idlers1"
  },
  {
    "loc": "/database/power-and-tension"
  },
  {
    "loc": "/database/power-packs"
  },
  {
    "loc": "/database/materials-handling-equipment"
  },
  {
    "loc": "/database/projects"
  },
  {
    "loc": "/database/pulleys1"
  },
  {
    "loc": "/database/quality-management"
  },
  {
    "loc": "/database/specifications"
  },
  {
    "loc": "/database/structural"
  },
  {
    "loc": "/database/take-ups"
  },
  {
    "loc": "/database/conditions-of-contract"
  },
  {
    "loc": "/database/assumptions"
  },
  {
    "loc": "/database/deliverables1"
  },
  {
    "loc": "/database/5910063fd0c87d43a4951406"
  },
  {
    "loc": "/database/electrical-deliverables"
  },
  {
    "loc": "/database/qa-qc"
  },
  {
    "loc": "/database/project-methodology"
  },
  {
    "loc": "/database/structural-and-civil-deliverables"
  },
  {
    "loc": "/database/mechanical-deliverables"
  },
  {
    "loc": "/database/dust-suppression-and-wash-water"
  },
  {
    "loc": "/database/fire-detection-and-suppression-system"
  },
  {
    "loc": "/database/general-inclusions-and-exclusions"
  },
  {
    "loc": "/database/inclusions-and-exclusions"
  },
  {
    "loc": "/database/information-required"
  },
  {
    "loc": "/database/limitations"
  },
  {
    "loc": "/database/precedence-deviations-and-conflicts1"
  },
  {
    "loc": "/database/belt-class"
  },
  {
    "loc": "/database/belt-cover-application"
  },
  {
    "loc": "/database/belt-cover-thickness"
  },
  {
    "loc": "/database/belt-cover-type"
  },
  {
    "loc": "/database/belt-modulus"
  },
  {
    "loc": "/database/belt-types"
  },
  {
    "loc": "/database/splice-type"
  },
  {
    "loc": "/database/belt-width"
  },
  {
    "loc": "/database/chute-design-categories"
  },
  {
    "loc": "/database/chute-hatch-design"
  },
  {
    "loc": "/database/wear-liners"
  },
  {
    "loc": "/database/bearing-deflection-limits"
  },
  {
    "loc": "/database/chute-types"
  },
  {
    "loc": "/database/belt-sag"
  },
  {
    "loc": "/database/bearing-life"
  },
  {
    "loc": "/database/friction-factor-goodyear"
  },
  {
    "loc": "/database/reducer-efficiency"
  },
  {
    "loc": "/database/induction-motor-efficiency"
  },
  {
    "loc": "/database/motor-fos"
  },
  {
    "loc": "/database/transitions"
  },
  {
    "loc": "/database/power-factor-cos-"
  },
  {
    "loc": "/database/5cea11d7e586822b48045ddd"
  },
  {
    "loc": "/database/general-notes-electrical"
  },
  {
    "loc": "/database/general-notes-flooring"
  },
  {
    "loc": "/database/general-notes-machining"
  },
  {
    "loc": "/database/general-notes-limitations"
  },
  {
    "loc": "/database/general-notes-platework"
  },
  {
    "loc": "/database/general-notes-steelwork"
  },
  {
    "loc": "/database/general-notes-surface-treatment"
  },
  {
    "loc": "/database/dust-suppression-system-categories"
  },
  {
    "loc": "/database/cost-units"
  },
  {
    "loc": "/database/cost-catagories"
  },
  {
    "loc": "/database/inclusions"
  },
  {
    "loc": "/database/job-catagories"
  },
  {
    "loc": "/database/man-hour-costing1"
  },
  {
    "loc": "/database/project-teams1"
  },
  {
    "loc": "/database/man-hour-costing"
  },
  {
    "loc": "/database/scheduling"
  },
  {
    "loc": "/database/project-teams"
  },
  {
    "loc": "/database/engineering-schedule"
  },
  {
    "loc": "/database/costing-schedule"
  },
  {
    "loc": "/database/implementation-schedule"
  },
  {
    "loc": "/database/58fb0f02a9d9042c4c56f8c1"
  },
  {
    "loc": "/database/applications"
  },
  {
    "loc": "/database/conveyor-components2"
  },
  {
    "loc": "/database/definitions"
  },
  {
    "loc": "/database/electrical-infrastructure"
  },
  {
    "loc": "/database/fiery-mines"
  },
  {
    "loc": "/database/hard-commodities"
  },
  {
    "loc": "/database/material"
  },
  {
    "loc": "/database/reference-documents"
  },
  {
    "loc": "/database/utility-frequencies"
  },
  {
    "loc": "/database/units"
  },
  {
    "loc": "/database/abbreviations-and-acronyms"
  },
  {
    "loc": "/database/suppliers"
  },
  {
    "loc": "/database/idler-frame-design"
  },
  {
    "loc": "/database/glossary"
  },
  {
    "loc": "/database/59044a5bf588ab3c34e26799"
  },
  {
    "loc": "/database/59044904f588ab3c34e2677f"
  },
  {
    "loc": "/database/idler-type"
  },
  {
    "loc": "/database/number-of-rolls"
  },
  {
    "loc": "/database/idlers-diameters"
  },
  {
    "loc": "/database/wing-roll-angles"
  },
  {
    "loc": "/database/shaft-series"
  },
  {
    "loc": "/database/categories"
  },
  {
    "loc": "/database/design-capacity-scenarios"
  },
  {
    "loc": "/database/mass-of-rotating-parts-carry-"
  },
  {
    "loc": "/database/drive-friction-factors"
  },
  {
    "loc": "/database/equipment-types"
  },
  {
    "loc": "/database/mass-of-rotating-parts-return-"
  },
  {
    "loc": "/database/59494e6965607e11acd0f51d"
  },
  {
    "loc": "/database/starting-mechanisms"
  },
  {
    "loc": "/database/flange-couplings"
  },
  {
    "loc": "/database/fluid-couplings1"
  },
  {
    "loc": "/database/input-coupling-efficiency"
  },
  {
    "loc": "/database/fluid-couplings2"
  },
  {
    "loc": "/database/fluid-coupling-sizes"
  },
  {
    "loc": "/database/gear-reducers"
  },
  {
    "loc": "/database/5ac841fedf6cb5384c2f6017"
  },
  {
    "loc": "/database/5ac841a1df6cb5384c2f6013"
  },
  {
    "loc": "/database/5ac84527df6cb5384c2f6038"
  },
  {
    "loc": "/database/59102d9bd0c87d43a49514dc"
  },
  {
    "loc": "/database/59103418d0c87d43a495150e"
  },
  {
    "loc": "/database/gear-reducer-mounting"
  },
  {
    "loc": "/database/feasibility-level"
  },
  {
    "loc": "/database/appendices"
  },
  {
    "loc": "/database/index"
  },
  {
    "loc": "/database/functional-specification"
  },
  {
    "loc": "/database/wbs-breakdown"
  },
  {
    "loc": "/database/5d527be3dd47b70ef4919af0"
  },
  {
    "loc": "/database/bearing-centers"
  },
  {
    "loc": "/database/bearing-centers-type"
  },
  {
    "loc": "/database/59494f8b65607e11acd0f52c"
  },
  {
    "loc": "/database/journal-shaft-diameters"
  },
  {
    "loc": "/database/hubs-and-bushing"
  },
  {
    "loc": "/database/lagging-materials"
  },
  {
    "loc": "/database/lagging-patterns"
  },
  {
    "loc": "/database/pulley-diameters"
  },
  {
    "loc": "/database/pulley-types"
  },
  {
    "loc": "/database/shaft-diameters"
  },
  {
    "loc": "/database/594935ed65607e11acd0f48e"
  },
  {
    "loc": "/database/standard-shaft-dimensions"
  },
  {
    "loc": "/database/type-of-end-disk"
  },
  {
    "loc": "/database/type-of-locking-element"
  },
  {
    "loc": "/database/lessons-learned"
  },
  {
    "loc": "/database/report-and-drawing-templates"
  },
  {
    "loc": "/database/quality-management-documentation"
  },
  {
    "loc": "/database/check-list"
  },
  {
    "loc": "/database/document-register"
  },
  {
    "loc": "/database/governing-codes-regulations"
  },
  {
    "loc": "/database/standards-and-specifications"
  },
  {
    "loc": "/database/dog-housing"
  },
  {
    "loc": "/database/take-up-movement"
  },
  {
    "loc": "/database/take-up-type"
  },
  {
    "loc": "/database/Blank"
  },
  {
    "loc": "/database/www.ringspann.co.za"
  },
  {
    "loc": "/database/Health%20,%20Safety%20and%20the%20Environment"
  },
  {
    "loc": "/database/AATC000170"
  }
]

 
  
 
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	testlist.push(siteIndex[i].loc)	
}

describe.skip("totalendpoint testing of sitemap", () => {
  test.each(testlist)(
    "given %p endpoint should return a 200.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
      .expect(200, done);
    }
  );
});


